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
    "dojo/text!app/templates/navigator.html"], function(declare, dom, parser, MapView, BasemapView, SearchView,
                                        LayersView, LegendView, templateString) {
    const Application = declare(null, {
        startup: function() {
            parser.parse();
            dom.byId("navigator-top").innerHTML = templateString;
            dom.byId("navigator-left").innerHTML = templateString;
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
        }
    });
    return Application;
});
