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
    "dojo/dom-class",
    "dojo/query",
    "app/views/MapView",
    "app/views/BasemapView",
    "app/views/SearchView",
    "app/views/LayersView",
    "app/views/LegendView",
    "app/views/MeasureView",
    "app/views/PrintView",
    "app/views/IdentifyView",
    "dojo/text!app/templates/navigator.html"
], function(declare, dom, domClass, query, MapView, BasemapView, SearchView,
            LayersView, LegendView, MeasureView, PrintView, IdentifyView, templateString) {
    const Application = declare(null, {
        startup: function() {
            dom.byId("navigator-top").innerHTML = templateString;
            query('#tocPanel > div').forEach(function(item) {
                domClass.add(item, "hidden");
            });
            query('[data-toggle="popover"]').popover({
                trigger: 'hover',
                container: 'body'
            });


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
            var identifyView = new IdentifyView({
                map: mapView.map,
                service: mapView.model.get("service")
            });
        }
    });
    return Application;
});
