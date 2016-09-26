/**
 * @class model.IdentifyModel
 */

/**
 * Tarea de identificacion
 *
 * @class models.IdentifyModel
 */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "esri/InfoTemplate",
    "esri/tasks/IdentifyTask",
    "esri/tasks/IdentifyParameters"], function(declare, lang, array, InfoTemplate, IdentifyTask, IdentifyParameters) {
    const IdentifyModel = declare(null, {
        defaults: {
            tolerance: 1,
            returnGeometry: true,
            layerOption: IdentifyParameters.LAYER_OPTION_VISIBLE,
        },
        service: null,
        map: null,
        constructor: function(options) {
            this.params = new IdentifyParameters();
            lang.mixin(this.params, this.defaults);
            this.map = options.map;
            this.service = options.service;
        },
        doIdentify: function(evt) {
            this.params.geometry = evt.mapPoint;
            this.params.mapExtent = this.map.extent;
            this.params.width  = this.map.width;
            this.params.height = this.map.height;

            var identifyTask = new IdentifyTask(this.service);
            var deferred = identifyTask.execute(this.params);

            deferred.addCallback(lang.hitch(this, this.onResult));

            this.map.infoWindow.setFeatures([ deferred ]);
            this.map.infoWindow.show(evt.mapPoint);
        },
        onResult: function(response) {
            return array.map(response, function (result) {
                var feature = result.feature;
                feature.attributes.layerName = result.layerName;
                if (!result.displayFieldName) {
                    result.displayFieldName = "NOMBRE";
                    if (!feature.attributes["NOMBRE"]) {
                        result.displayFieldName = "nombre";
                    }
                }
                if (result.layerName.match("Manzana.*")) {
                    result.displayFieldName = "numero";
                }
                var msg = "<b>${layerName}</b> <br/>${" + result.displayFieldName + "} <br/>";
                for (var item in feature.attributes) {
                    if (!item.match("Shape.*|ID|layer")) {
                        msg += "<i>" + item + ":</i> ${" + item + "}<br/>";
                    }
                }
                var template = new InfoTemplate(result.layerName, msg);
                feature.setInfoTemplate(template);
                return feature;
            });
        }
    });
    return IdentifyModel;
});
