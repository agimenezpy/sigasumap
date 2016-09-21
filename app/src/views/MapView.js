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
    "esri/map",
    "esri/config",
    "esri/basemaps",
    "esri/geometry/Extent",
    "esri/dijit/Scalebar",
    "esri/dijit/HomeButton",
    "esri/dijit/LocateButton",
    "esri/dijit/Attribution",
    "esri/tasks/GeometryService",
    "app/models/MapModel",
    "app/lib/ResizedMap"], function(declare, lang, dom, number, Map, esriConfig, esriBasemaps,
                                     Extent, Scalebar, HomeButton, LocateButton,
                                     Attribution, GeometryService, MapModel, ResizedMap) {
    const MapView = declare(null, {
        model: new MapModel({
            name: "asuncion",
            extent: [432442.999187, 7194095.990115, 447118.346893, 7209975.084757],
            wkid: 32721,
            service: "/Mapa_Web/Mapa_General/MapServer"
        }),
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
            var fmt = {pattern: "#.00"};

            this.map.on("mouse-move", function (evt) {
                dom.byId("coordinates").innerHTML = number.format(evt.mapPoint.x, fmt) + " , "
                    + number.format(evt.mapPoint.y, fmt);
            });
        }
    });

    return MapView;
});
