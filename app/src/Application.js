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
    "app/views/FindView",
    "app/views/LayersView",
    "app/views/LegendView",
    "app/views/MeasureView",
    "app/views/PrintView",
    "app/views/IdentifyView",
    "dojo/text!app/templates/navigator.html"
], function(declare, dom, domClass, query, MapView, FindView,
            LayersView, LegendView, MeasureView, PrintView, IdentifyView, templateString) {
    const Application = declare(null, {
        startup: function() {
            dom.byId("navigator-top").innerHTML = templateString;
            query('#tocPanel > div, #measure').forEach(function(item) {
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
            var findView = new FindView({
                mapView: mapView
            });
            findView.show();
            var layersView = new LayersView({
                mapView: mapView
            });
            var legendView = new LegendView({
                mapView: mapView
            });
            var measureView = new MeasureView({
                map: mapView.map
            });
            var printView = new PrintView({
                mapView: mapView
            });
            var identifyView = new IdentifyView({
                map: mapView.map,
                service: mapView.model.get("service")
            });
        }
    });
    return Application;
});
