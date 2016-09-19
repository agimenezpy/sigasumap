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
    "app/views/MapView",
    "app/views/BasemapView",
    "app/views/SearchView",
    "dojo/text!app/templates/navigator.html"], function(declare, dom, MapView, BasemapView, SearchView, templateString) {
    const Application = declare(null, {
        startup: function() {
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
            dom.byId("navigator-top").innerHTML = templateString;
            dom.byId("navigator-left").innerHTML = templateString;
        }
    });
    return Application;
});
