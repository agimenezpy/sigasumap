/**
 * Main Application
 *
 * @author agimenez
 */

/**
 * @class js.Application
 */
define(["dojo/_base/declare",
    "dojo/dom",
    "dojo/parser",
    "app/views/MapView",
    "app/views/BasemapView",
    "app/views/SearchView",
    "app/views/LayersView",
    "app/views/LegendView",
    "app/views/MeasureView",
    "app/views/PrintView",
    "dojo/text!app/templates/navigator.html",
    "dijit/layout/BorderContainer",
    "dijit/layout/StackContainer",
    "dijit/layout/ContentPane",
    "dijit/form/ToggleButton",
    "dijit/Tooltip"
], function(declare, dom, parser, MapView, BasemapView, SearchView,
            LayersView, LegendView, MeasureView, PrintView, templateString) {
    const Application = declare(null, {
        startup: function() {
            dom.byId("navigator-top").innerHTML = templateString;

            parser.parse();

            var mapView = new MapView({
                slider: true,
                logo: false,
                fitExtent: true
            });
            mapView.show();
            var baseView = new BasemapView({
                map: mapView.map,
                showArcGISBasemaps: true
            });
            var searchView = new SearchView({
                map: mapView.map
            });
            searchView.show();
            var layersView = new LayersView({
                map: mapView.map
            });
            layersView.show();
            var legendView = new LegendView({
                map: mapView.map
            });
            var measureView = new MeasureView({
                map: mapView.map
            });
            var printView = new PrintView({
                map: mapView.map
            });
        }
    });
    return Application;
});
