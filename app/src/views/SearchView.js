/**
 * Search view
 * @author agimenez
 */

/**
 * @class view.SearchView
 */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "esri/tasks/locator",
    "esri/tasks/find",
    "esri/dijit/Search",
    "esri/symbols/PictureMarkerSymbol",
    "esri/InfoTemplate",
    "dojo/text!app/templates/search_result.html"], function(declare, lang, Locator, FindTask, Search,
                                                        PictureMarkerSymbol, InfoTemplate, templateString) {
    const SearchView = declare(null, {
        constructor: function(options) {
            this.map = options.map;
        },
        show: function() {
            var locator = new Locator(CONFIG.root_url + "/Locator/geocalles/GeocodeServer/");
            locator.outSpatialReference = this.map.spatialReference;
            var barrios = new Locator(CONFIG.root_url + "/Locator/Barrios/GeocodeServer");
            barrios.outSpatialReference = this.map.spatialReference;
            var defaultSettings = {
                singleLineFieldName: "Single Line Input",
                outFields: ["Match_addr"],
                highlightSymbol: new esri.symbol.PictureMarkerSymbol("images/search-pointer.png", 36, 36).setOffset(9, 18),
                //Create an InfoTemplate
                infoTemplate: new InfoTemplate("Ubicación", templateString),
            };
            var search = new Search({
              sources: [
                lang.mixin({}, { locator: locator, name: "GeoCalles", placeholder: "Buscar dirección"}, defaultSettings),
                lang.mixin({}, { locator: barrios, name: "Barrios", placeholder: "Buscar barrios"}, defaultSettings)
              ],
              map: this.map,
              enableSearchingAll: true,
              enableSuggestions: true,
              autoComplete: true,
              addLayersFromMap: true,
              value: ""
            }, "search");

            search.startup();
        }
    });
    return SearchView;
});