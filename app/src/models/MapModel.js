/**
 * Map Model
 * @author agimenez
 */

/**
 * Modelo del mapa
 * @class model.Map
 */
define(["dojo/_base/declare",
    "dojo/_base/lang"], function(declare, lang) {
    const MapModel = declare(null, {
        defaults: {
            name: "Sample",
            extent: [-180, -90, 180, 90],
            wkid: 4326,
            service: "/"
        },
        constructor: function(options) {
            this.attributes = lang.mixin({}, this.defaults, options)
        },
        get: function(key) {
            return this.attributes[key] || "";
        }
    });
    return MapModel;
});
