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
            this.map = options.map;
            this.service = options.service;
            this.template = new InfoTemplate();
            this.template.setTitle("${layerName}");
            this.template.setContent(templateString);
        },
        getParams: function(evt, selected) {
            var params = new IdentifyParameters();
            lang.mixin(params, this.defaults);
            params.layerIds = LayerUtils.getLayerIds(this.map.getLayer(selected));
            params.geometry = evt.mapPoint;
            params.mapExtent = this.map.extent;
            params.width  = this.map.width;
            params.height = this.map.height;
            return params;
        },
        doIdentify: function(evt) {
            var self = this;
            var identifyTask = new IdentifyTask(this.service);
            var promises = [];
            arrayUtils.forEach(LayerUtils.getVisibleLayers(this.map), function(selected){
                var params = self.getParams(evt, selected);
                var deferred = identifyTask.execute(params);
                deferred.addCallback(lang.hitch(self, self.onResult));
                promises.push(deferred);
            });

            this.map.infoWindow.setFeatures(promises);
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
