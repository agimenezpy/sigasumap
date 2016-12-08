/**
 * Layer Utils
 * @author agimenez
 */

/**
 * @class lib.LayerUtils
 */
define(["dojo/_base/declare",
    "dojo/_base/array"], function(declare, arrayUtils) {
    const LayerUtils = declare(null, {
        getLayerIds: function(layer) {
            var layers = [];
            var matchObj = null;
            if (arguments.length > 1) {
                matchObj = arguments[1];
            }
            arrayUtils.forEach(layer.layerInfos, function(item) {
                if (item.subLayerIds === null) {
                    if (matchObj !== null && item.name.search(matchObj) === -1) {
                        return;
                    }
                    layers.push(item.id);
                }
            });
            return layers;
        },
        getVisibleLayers: function(map) {
             var layers = [];
            arrayUtils.forEach(map.layerIds, function(value) {
                if (map.getLayer(value).visible) {
                    layers.push(value);
                }
            });
            return layers;
        }
    });
    return new LayerUtils();
});