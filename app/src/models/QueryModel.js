/**
 * Find Model
 * @author agimenez
 */

/**
 * Tarea de busqueda
 *
 * @class models.FindModel
 */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/string",
    "app/lib/LayerUtils",
    "esri/tasks/QueryTask",
    "esri/tasks/query"],
    function(declare, lang, arrayUtils, string, LayerUtils, QueryTask, Query) {
    var QueryModel = declare(null, {
        defaults: {
            returnGeometry: false
        },
        layersForSearch: /^Calle$/,
        map: null,
        constructor: function(options) {
            this.map = options.map;
        },
        getParams: function(layer) {
            var params = new Query();
            lang.mixin(params, this.defaults);
            params.outSpatialReference = this.map.spatialReference;
            params.layerIds = LayerUtils.getLayerIds(layer, this.layersForSearch);
            return params;
        },
        doSearch: function(searchText) {
            var selected = this.map.layerIds[0];
            var layer = this.map.getLayer(selected);
            if (!layer.description || layer.description.indexOf("Mapa General") < 0) {
                return;
            }
            var params = this.getParams(layer);
            var searchTask = new QueryTask(layer.url + "/" + params.layerIds);
            params.where = string.substitute("NOMBRE ilike '%${searchText}%'", {"searchText": searchText});
            return searchTask.execute(params);
        },
        onResult: function(response) {
            var unique = {};
            var field = response.fields[0].name;
            var names = arrayUtils.filter(response.features, function (feature) {
                if (!unique[feature.attributes[field]]) {
                    unique[feature.attributes[field]] = true;
                    return true;
                }
                return false;
            }, this);
            return arrayUtils.map(names, function(feature) {
                return feature.attributes[field];
            });
        }
    });
    return QueryModel;
});
