/**
 * Main Application
 *
 * @author agimenez
 */

/**
 * @class js.Application
 */
define(["dojo/_base/declare",
    "dojo/query",
    "app/views/MapView",
    "app/views/SearchView",
    "app/views/LocateView",
    "app/views/LayersView",
    "app/views/LegendView",
    "app/views/MeasureView",
    "app/views/PrintView",
    "app/views/IdentifyView",
    "dojo/text!app/templates/navigator.html"
], function(declare, query, MapView, SearchView, LocateView, LayersView, LegendView,
            MeasureView, PrintView, IdentifyView, templateString) {
    var Application = declare(null, {
        startup: function() {
            query("#navigator-top").addContent(templateString);
            query('#tocPanel > div, #measure').addClass("hidden");
            query('[data-toggle="tooltip"]').tooltip({
                trigger: 'hover'
            });

            var mapView = new MapView({
                slider: true,
                logo: false,
                fitExtent: true
            });
            mapView.show();
            var searchView = new SearchView({
                map: mapView.map
            });
            searchView.show();
            var locateView = new LocateView({
                mapView: mapView,
                service: [
                    CONFIG.root_url + "/Locator/geocalles/GeocodeServer",
                    CONFIG.root_url + "/Locator/Lotes_CCC_Busqueda/GeocodeServer",
                    CONFIG.root_url + "/Locator/COPROPIEDAD/GeocodeServer"
                ]
            });
            var layersView = new LayersView({
                mapView: mapView
            });
            var legendView = new LegendView({
                mapView: mapView
            });
            var measureView = new MeasureView({
                mapView: mapView
            });
            var printView = new PrintView({
                mapView: mapView
            });
            var identifyView = new IdentifyView({
                mapView: mapView
            });
        }
    });
    return Application;
});
