/**
 * Modelo del mapa
 */
var Backbone = require("backbone");
var config = require("config");

/**
 * @class model.Map
 */
const Map = Backbone.Model.extend({
    url: config.root_url,
    defaults: {
        name: "Sample",
        extent: [-180, -90, 180, 90],
        wkid: 4326,
        service: "/"
    }
});

module.exports = Map;
