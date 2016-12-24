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
    "esri/tasks/FindTask",
    "esri/tasks/FindParameters"],
    function(declare, lang, arrayUtils, string, LayerUtils, FindTask, FindParameters) {
    const QueryModel = declare(null, {
        defaults: {
            returnGeometry: false
        },
        layersForSearch: /^Calle$/,
        map: null,
        constructor: function(options) {
            this.map = options.map;
        },
        getParams: function(layer) {
            var params = new FindParameters();
            lang.mixin(params, this.defaults);
            params.outSpatialReference = this.map.spatialReference;
            params.layerIds = LayerUtils.getLayerIds(layer, this.layersForSearch);
            params.searchFields = LayerUtils.getDisplayField(layer, params.layerIds);
            return params;
        },
        doSearch: function(searchText) {
            var selected = this.map.basemapLayerIds[0];
            var layer = this.map.getLayer(selected );
            var searchTask = new FindTask(layer.url);
            var params = this.getParams(layer);
            params.searchText = searchText;
            return searchTask.execute(params);
        },
        onResult: function(response, callback) {
            var unique = {};

            var names = arrayUtils.filter(response, function (result) {
                var feature = result.feature;
                if (!unique[result.value]) {
                    unique[result.value] = true;
                    return true;
                }
                return false;
            }, this);
            return arrayUtils.map(names, function(item) {
                return item.value;
            });
        }
    });
    return QueryModel;
});
