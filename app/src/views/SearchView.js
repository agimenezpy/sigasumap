/**
 * Search view
 * @author agimenez
 */

/**
 * @class view.SearchView
 */
define([
    "require",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "esri/tasks/locator",
    "esri/tasks/find",
    "esri/dijit/Search",
    "esri/symbols/PictureMarkerSymbol",
    "esri/InfoTemplate",
    "dojo/text!app/templates/search_result.html"], function(require, declare, lang, Locator, FindTask, Search,
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
            var lotes = new Locator(CONFIG.root_url + "/Locator/Lotes_CCC_Busqueda/GeocodeServer");
            lotes.outSpatialReference = this.map.spatialReference;
            var copropiedad = new Locator(CONFIG.root_url + "/Locator/COPROPIEDAD/GeocodeServer");
            copropiedad.outSpatialReference = this.map.spatialReference;
            var defaultSettings = {
                singleLineFieldName: "Single Line Input",
                outFields: ["Match_addr"],
                highlightSymbol: new PictureMarkerSymbol(require.toUrl("esri") + "/dijit/images/sdk_gps_location.png", 36, 36).setOffset(9, 18),
                //Create an InfoTemplate
                infoTemplate: new InfoTemplate("Ubicación", templateString)
            };
            var search = new Search({
                sources: [
                    lang.mixin({}, { locator: locator, name: "Direcciones", placeholder: "Buscar dirección"}, defaultSettings),
                    lang.mixin({}, { locator: barrios, name: "Barrios", placeholder: "Buscar barrios"}, defaultSettings),
                    lang.mixin({}, { locator: lotes, name: "Lotes", placeholder: "Buscar lotes"}, defaultSettings),
                    lang.mixin({}, { locator: copropiedad, name: "Copropiedad", placeholder: "Buscar lotes con copropiedad"}, defaultSettings)
                ],
                map: this.map,
                enableSearchingAll: true,
                enableSuggestions: true,
                autoNavigate: true,
                autoSelect: true,
                autoComplete: true,
                addLayersFromMap: true,
                value: ""
            }, "search");

            search.startup();
        }
    });
    return SearchView;
});