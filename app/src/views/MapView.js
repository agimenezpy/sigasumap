/**
 * Map view
 * @author agimenez
 */

/**
 * @class view.MapView
 */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/connect",
    "dojo/dom",
    "dojo/dom-class",
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
    "app/lib/ResizedMap",
    "app/models/MapModel"], function(declare, lang, connect, dom, domClass, number,
                                     Map, esriConfig, esriBasemaps,
                                     Extent, Scalebar, HomeButton, LocateButton,
                                     Attribution, GeometryService, ResizedMap, MapModel) {
    var MapView = declare(null, {
        extent: [ -57.671486, -25.368339, -57.525007, -25.225538],
        model: new MapModel({
            name: "asuncion",
            extent: [432442.999187, 7194095.990115, 447118.346893, 7209975.084757],
            wkid: 32721,
            service: "/Mapa_Web/Mapa_General/MapServer"
        }),
        fmt: { pattern: "#.00" },
        large: "col-lg-12 col-md-12 col-sm-12 col-xs-12",
        small: "col-lg-9 col-md-8 col-sm-7 hidden-xs",
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
            this.resizer = new ResizedMap("map", lang.mixin({}, this.options, {
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
            }));
            this.map = this.resizer.createMap();
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
            connect.connect(this.map.infoWindow, "onSelectionChange", lang.hitch(this, this.onSelectFeature));
        },
        onSelectFeature: function() {
            var feature = this.map.infoWindow.getSelectedFeature();
            if (feature) {
                this.map.infoWindow.hide();
                var geometry = feature.geom || feature.geometry;
                var extent = geometry.getExtent();
                var location = (extent && extent.getCenter()) || geometry;
                this.map.infoWindow.show(location);
                if (extent) {
                    this.map.setExtent(extent);
                    this.map.centerAt(location);
                }
                else {
                    var maxZoom = this.map.getMaxZoom();
                    if (this.map.getZoom() != maxZoom) {
                        this.map.centerAndZoom(location, maxZoom);
                    }
                    else {
                        this.map.centerAt(location);
                    }
                    this.map.infoWindow.markerSymbol = geometry.symbol;
                }
            }
        },
        showCoordinates: function (evt) {
            dom.byId("coordinates").innerHTML = number.format(evt.mapPoint.x, this.fmt) + " , "
                + number.format(evt.mapPoint.y, this.fmt);
        },
        resizeMap: function() {
            this.resizer._setMapDiv(true);
        },
        wide: function () {
            var panel = dom.byId("tocPanel");
            var mapPanel = dom.byId("mapPanel");
            domClass.add(panel, "hidden");
            domClass.remove(mapPanel, this.small);
            domClass.add(mapPanel, this.large);
            this.resizeMap();
        },
        open: function () {
            var panel = dom.byId("tocPanel");
            var mapPanel = dom.byId("mapPanel");
            domClass.remove(panel, "hidden");
            domClass.remove(mapPanel, this.large);
            domClass.add(mapPanel, this.small);
            this.resizeMap();
        },
        setBasemap: function(basemap) {
            if (basemap !== "asuncion") {
                 var extent = new Extent({
                    "xmin": this.extent[0],
                    "ymin": this.extent[1],
                    "xmax": this.extent[2],
                    "ymax": this.extent[3],
                    "spatialReference": {
                        "wkid": 4326
                    }
                });
                this.map.setExtent(extent, true);
            }
        }
    });

    return MapView;
});
