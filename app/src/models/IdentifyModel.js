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
    "dojo/text!app/templates/identify_result.html"],
    function(declare, lang, arrayUtils, string, LayerUtils, InfoTemplate, IdentifyTask, IdentifyParameters, templateString) {
    var IdentifyModel = declare(null, {
        defaults: {
            tolerance: 3, // Pixeles
            returnGeometry: true,
            layerOption: IdentifyParameters.LAYER_OPTION_VISIBLE
        },
        map: null,
        constructor: function(options) {
            this.map = options.map;
            this.template = new InfoTemplate();
            this.template.setTitle("${layerName}");
            this.template.setContent(templateString);
        },
        getParams: function(evt, layer) {
            var params = new IdentifyParameters();
            lang.mixin(params, this.defaults);
            params.layerIds = LayerUtils.getLayerIds(layer);
            params.geometry = evt.mapPoint;
            params.mapExtent = this.map.extent;
            params.width  = this.map.width;
            params.height = this.map.height;
            return params;
        },
        doIdentify: function(evt) {
            var promises = [];
            arrayUtils.forEach(LayerUtils.getVisibleLayers(this.map), function(selected){
                var layer = this.map.getLayer(selected);
                var identifyTask = new IdentifyTask(layer.url);
                var params = this.getParams(evt, layer);
                var deferred = identifyTask.execute(params);
                deferred.addCallback(lang.hitch(this, this.onResult));
                promises.push(deferred);
            }, this);
            
            return promises;
        },
        onResult: function(response) {
            return arrayUtils.map(response, function (result) {
                var feature = result.feature;
                feature.attributes.displayFieldName = result.value;
                feature.attributes.layerName = result.layerName;
                feature.setInfoTemplate(this.template);
                return feature;
            }, this);
        }
    });
    return IdentifyModel;
});
