/**
 * Search view
 * @author agimenez
 */

/**
 * @class view.SearchView
 */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "esri/layers/FeatureLayer",
    "esri/tasks/locator",
    "esri/tasks/find",
    "esri/dijit/Search",
    "esri/symbols/PictureMarkerSymbol",
    "esri/InfoTemplate",
    "dojo/text!app/templates/search_result.html"], function(declare, lang, FeatureLayer, Locator, FindTask, Search,
                                                        PictureMarkerSymbol, InfoTemplate, templateString) {

    const MyFeatureLayer = declare(FeatureLayer, {
        getGeometryType: function() { return "esriGeometryPolyline"}
    });

    const SearchView = declare(null, {
        constructor: function(options) {
            this.map = options.map;
        },
        show: function() {
            var locator = new Locator(CONFIG.root_url + "/Locator/geocalles/GeocodeServer/");
            locator.outSpatialReference = this.map.spatialReference;
            var barrios = new Locator(CONFIG.root_url + "/Locator/Barrios/GeocodeServer");
            barrios.outSpatialReference = this.map.spatialReference;
            var calleSearch = {
                featureLayer: new MyFeatureLayer(CONFIG.root_url + "/Mapa_Web/Mapa_General/MapServer/15", {
                    layerDefinition: {
                        "geometryType": "esriGeometryPolygon"
                    }
                }),
                searchFields: ["nombre"],
                suggestionTemplate: "${nombre}, Party: ${alias}",
                exactMatch: false,
                outFields: ["*"],
                name: "Calles",
                placeholder: "Nombre de calle",
                maxResults: 6,
                maxSuggestions: 6,
                enableSuggestions: true,
                minCharacters: 0,
                returnGeometry: true,
                localSearchOptions: {distance: 5000}
            };
            var defaultSettings = {
                singleLineFieldName: "Single Line Input",
                outFields: ["Match_addr"],
                highlightSymbol: new PictureMarkerSymbol("esri/dijit/images/sdk_gps_location.png", 36, 36).setOffset(9, 18),
                //Create an InfoTemplate
                infoTemplate: new InfoTemplate("Ubicación", templateString)
            };
            var search = new Search({
                sources: [
                    lang.mixin({}, { locator: locator, name: "GeoCalles", placeholder: "Buscar dirección"}, defaultSettings),
                    lang.mixin({}, { locator: barrios, name: "Barrios", placeholder: "Buscar barrios"}, defaultSettings),
                    calleSearch
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