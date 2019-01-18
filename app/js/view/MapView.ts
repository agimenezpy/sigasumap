/**
 * Map view
 * @author agimenez
 */
import EsriMap = require("esri/Map");
import EsriMapView = require("esri/views/MapView");
import Basemap = require("esri/Basemap");
import WebTileLayer = require("esri/layers/WebTileLayer");
import ScaleBar = require("esri/widgets/ScaleBar");
import MapModel from "../model/MapModel.ts"
import Config from "../model/Config.ts"

/**
 * @class view.MapView
 */
class MapView {
    extent: Array;
    model: MapModel;
    map: EsriMap;
    constructor(config: Config) {
        this.extent = [ -57.671486, -25.368339, -57.525007, -25.225538];
        this.model = {
            name: "asuncion",
            extent: [432442.999187, 7194095.990115, 447118.346893, 7209975.084757],
            wkid: 32721,
            service: "/Mapa_Web/Mapa_General/MapServer"
        };
        let basemap = new Basemap({
            baseLayers: [
                new WebTileLayer({
                    urlTemplate:  config.base_url + config.root_url + this.model.service,
                    copyright: "Departamento S.I.G. - Dirección de General de Desarrollo Urbano " +
                                "- Direcciónde Catastro Municipal."
                })
            ],
            thumbnailUrl: "images/basemap.png",
            title: "Mapa General"
        };
        this.map = new EsriMap({
          basemap: basemap
        });
    }
    show() {
        let extent = this.model.extent;
        const mapView = new EsriMapView({
            map: this.map,
            container: "map",
            extent: {
                xmin: extent[0],
                ymin: extent[1],
                xmax: extent[2],
                ymax: extent[3],
                spatialReference: this.model.wkid
            },
            zoom: 12
        });
        var scaleBar = new ScaleBar({
            view: mapView,
            unit: "metric"
        });

        mapView.ui.add(scaleBar, {
            position: "bottom-left"
        });
         /*   var homeButton = new HomeButton({
                map: this.map,
                extent: this.map.extent
            }, "home");
            homeButton.startup();
            esriConfig.defaults.geometryService = new GeometryService(CONFIG.root_url + "/Geometry/GeometryServer");
            var locateButton = new LocateButton({
                map: this.map
            }, "location");
            locateButton.startup();
            var attribution = new Attribution({
                map: this.map
            }, "attribution");
            attribution.startup();*/
    }
}