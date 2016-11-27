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
            var matchObj = /^(Zonas|Barrios|Manzana|Lote|Calle|Avenidas Principales|Lotes)$/;
            if (arguments.length > 1) {
                matchObj = arguments[1];
            }
            arrayUtils.forEach(layer.layerInfos, function(item) {
                if (item.subLayerIds === null) {
                    if (item.name.search(matchObj) !== -1) {
                        layers.push(item.id);
                    }
                }
            });
            return layers;
        }
    });
    return new LayerUtils();
});