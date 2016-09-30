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
        getLayerIds: function(layerInfos) {
            var layers = [];
            arrayUtils.forEach(layerInfos, function(item) {
                if (item.subLayerIds === null) {
                    if (item.name.search(/^(Zonas|Barrios|Manzana|Lote|Calle|Avenidas Principales|Lotes)$/) !== -1) {
                        layers.push(item.id);
                    }
                }
            });
            return layers;
        }
    });
    return new LayerUtils();
});