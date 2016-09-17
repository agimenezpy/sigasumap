/**
 * Map view
 * @author agimenez
 */
var Backbone = require("backbone");
var config = require("config");
var esri = require("esri");

/**
 * @class view.BaseMapView
 */
const SearchView = Backbone.View.extend({
    initialize: function(options) {
        Backbone.View.prototype.initialize.apply(this, arguments);
        this.options = _.omit(options, "model", "el");
    },
    render: function() {
        var locator = new esri.tasks.Locator(config.root_url + "/Locator/geocalles/GeocodeServer/");
        locator.outSpatialReference = this.options.map.spatialReference;
        this.search = new esri.dijit.Search({
          sources: [
            {
              //Pass in the custom locator to the sources
              locator: locator,
              singleLineFieldName: "Single Line Input",
              outFields: ["Match_addr"],
              name: "GeoCalles",
              placeholder: "Buscar calle",
              highlightSymbol: new esri.symbol.PictureMarkerSymbol("https://js.arcgis.com/3.17/esri/dijit/Search/images/search-pointer.png", 36, 36).setOffset(9, 18),
              //Create an InfoTemplate
              infoTemplate: new esri.InfoTemplate("Ubicación", "Dirección: ${address}<br />Calificación: ${score}")
            }
          ],
          map: this.options.map,
          enableSearchingAll: false,
          autoComplete: true,
          value: ""
        }, "Search");

        this.search.startup();

        return this;
    }
});

module.exports = SearchView;