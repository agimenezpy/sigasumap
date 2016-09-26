/**
 * Map view
 * @author agimenez
 */

/**
 * @class view.MapView
 */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom",
    "dojo/number",
    "dijit/registry",
    "esri/map",
    "esri/config",
    "esri/basemaps",
    "esri/geometry/Extent",
    "esri/dijit/Scalebar",
    "esri/dijit/HomeButton",
    "esri/dijit/LocateButton",
    "esri/dijit/Attribution",
    "esri/tasks/GeometryService",
    "app/lib/ResizedMap",
    "app/models/MapModel"], function(declare, lang, dom, number, dijit, Map, esriConfig, esriBasemaps,
                                     Extent, Scalebar, HomeButton, LocateButton,
                                     Attribution, GeometryService, ResizedMap, MapModel) {
    const MapView = declare(null, {
        model: new MapModel({
            name: "asuncion",
            extent: [432442.999187, 7194095.990115, 447118.346893, 7209975.084757],
            wkid: 32721,
            service: "/Mapa_Web/Mapa_General/MapServer"
        }),
        fmt: { pattern: "#.00" },
        constructor: function (options) {
            this.options = lang.mixin({}, options);
            esriBasemaps[this.model.get("name")] = {
                baseMapLayers: [{
                    url:  CONFIG.root_url + this.model.get("service"),
                    copyright: "Departamento S.I.G. - Dirección de General de Desarrollo Urbano " +
                    "- Direcciónde Catastro Municipal."
                }],
                thumbnailUrl: "images/basemap.png",
                title: "Mapa General"
            };
        },
        show: function () {
            var extent = this.model.get("extent");
            this.map = new ResizedMap("map", lang.mixin({}, this.options, {
                basemap: this.model.get("name"),
                autoResize: true,
                scrollWheelZoom: true,
                extent: new Extent({
                    "xmin": extent[0],
                    "ymin": extent[1],
                    "xmax": extent[2],
                    "ymax": extent[3],
                    "spatialReference": {
                        "wkid": this.model.get("wkid")
                    }
                }),
                showAttribution: false
            })).createMap();
            var scalebar = new Scalebar({
                map: this.map,
                scalebarUnit: 'metric'
            });
            var homeButton = new HomeButton({
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
            attribution.startup();

            this.map.on("mouse-move", lang.hitch(this, this.showCoordinates));
        },
        showCoordinates: function (evt) {
            dom.byId("coordinates").innerHTML = number.format(evt.mapPoint.x, this.fmt) + " , "
                + number.format(evt.mapPoint.y, this.fmt);
        },
        resizeMap: function() {
            this.map.resize();
            this.map.reposition();
        }
    });

    return MapView;
});
