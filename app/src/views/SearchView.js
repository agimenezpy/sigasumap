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
    "app/models/SearchModel",
    "app/models/FindModel",
    "esri/tasks/locator",
    "esri/symbols/PictureMarkerSymbol",
    "esri/InfoTemplate",
    "dojo/text!app/templates/search_result.html"], function(require, declare, lang, Search, FindModel, Locator,
                                                        PictureMarkerSymbol, InfoTemplate, templateString) {
    const SearchView = declare(null, {
        constructor: function(options) {
            this.map = options.mapView.map;
            this.service = CONFIG.root_url + options.mapView.model.get("service");
        },
        show: function() {
            var find = new FindModel({
                map: this.map,
                service: this.service
            });
            var locator = new Locator(CONFIG.root_url + "/Locator/Direccion/GeocodeServer");
            locator.outSpatialReference = this.map.spatialReference;
            var barrios = new Locator(CONFIG.root_url + "/Locator/Barrios/GeocodeServer");
            barrios.outSpatialReference = this.map.spatialReference;
            var lotes = new Locator(CONFIG.root_url + "/Locator/Lotes/GeocodeServer");
            lotes.outSpatialReference = this.map.spatialReference;
            var copropiedad = new Locator(CONFIG.root_url + "/Locator/COPROPIEDAD/GeocodeServer");
            copropiedad.outSpatialReference = this.map.spatialReference;
            var defaultSettings = {
                singleLineFieldName: "Single Line Input",
                outFields: ["Match_addr"],
                highlightSymbol: new PictureMarkerSymbol(require.toUrl("esri") + "/dijit/images/sdk_gps_location.png", 36, 36).setOffset(9, 18),
                //Create an InfoTemplate
                infoTemplate: new InfoTemplate("Ubicación", templateString),
                enableSuggestions: false
            };
            var search = new Search({
                sources: [
                    lang.mixin({}, { finder: find, name: "Mapa", placeholder: "Buscar en el mapa",
                        searchTemplate: "${layername}: ${name}"}),
                    lang.mixin({}, { locator: locator, name: "Direcciones", placeholder: "Buscar dirección"}, defaultSettings),
                    lang.mixin({}, { locator: barrios, name: "Barrios", placeholder: "Buscar barrios"}, defaultSettings),
                    lang.mixin({}, { locator: lotes, name: "Lotes", placeholder: "Buscar lotes"}, defaultSettings)
                    //lang.mixin({}, { locator: copropiedad, name: "Copropiedad", placeholder: "Buscar lotes con copropiedad"}, defaultSettings)
                ],
                map: this.map,
                enableSearchingAll: false,
                enableSuggestions: true,
                autoNavigate: true,
                autoSelect: true,
                autoComplete: true,
                addLayersFromMap: false,
                value: ""
            }, "search");

            search.startup();
        }
    });
    return SearchView;
});