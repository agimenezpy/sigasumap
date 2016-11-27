/**
 * @class model.IdentifyModel
 */

/**
 * Tarea de identificación
 *
 * @class models.IdentifyModel
 */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/string",
    "app/lib/LayerUtils",
    "esri/InfoTemplate",
    "esri/tasks/IdentifyTask",
    "esri/tasks/IdentifyParameters",
    "dojo/text!app/templates/feature_result.html"],
    function(declare, lang, arrayUtils, string, LayerUtils, InfoTemplate, IdentifyTask, IdentifyParameters, templateString) {
    const IdentifyModel = declare(null, {
        defaults: {
            tolerance: 1,
            returnGeometry: true,
            layerOption: IdentifyParameters.LAYER_OPTION_VISIBLE
        },
        service: null,
        map: null,
        constructor: function(options) {
            this.params = new IdentifyParameters();
            lang.mixin(this.params, this.defaults);
            this.map = options.map;
            this.service = options.service;
            this.template = new InfoTemplate();
            this.template.setTitle("${layerName}");
            this.template.setContent(templateString);
        },
        doIdentify: function(evt) {
            var selected = this.map.basemapLayerIds[0];
            this.params.layerIds = LayerUtils.getLayerIds(this.map.getLayer(selected));
            this.params.geometry = evt.mapPoint;
            this.params.mapExtent = this.map.extent;
            this.params.width  = this.map.width;
            this.params.height = this.map.height;

            var identifyTask = new IdentifyTask(this.service);
            var deferred = identifyTask.execute(this.params);

            deferred.addCallback(lang.hitch(this, this.onResult));

            this.map.infoWindow.setFeatures([ deferred ]);
            this.map.infoWindow.show(evt.mapPoint);
            this.map.centerAt(evt.mapPoint);
        },
        onResult: function(response) {
            var self = this;
            return arrayUtils.map(response, function (result) {
                var feature = result.feature;
                feature.attributes.layerName = result.layerName;
                var msg = "";
                for (var item in feature.attributes) {
                    if (!item.match("Shape.*|ID|layer")) {
                        msg += string.substitute("<label>${label}: </label><i>${value}</i><br>",
                            {label: item, value: feature.attributes[item]});
                    }
                }
                feature.attributes.extra = msg;
                feature.setInfoTemplate(self.template);
                return feature;
            });
        }
    });
    return IdentifyModel;
});
