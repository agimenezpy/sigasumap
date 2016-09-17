/**
 * Map view
 * @author agimenez
 */
var Backbone = require("backbone");
var _ = require("underscore");
var Map = require("models/map");
var esri = require("esri");

/**
 * @class view.MapView
 */
const MapView = Backbone.View.extend({
    model: new Map({
        name: "asuncion",
        extent: [432442.999187, 7194095.990115, 447118.346893, 7209975.084757],
        wkid: 32721,
        service: "/Mapa_Web/Mapa_General/MapServer"
    }),
    initialize: function(options) {
        Backbone.View.prototype.initialize.apply(this, arguments);
        this.options = _.omit(options, "model", "el");
        esri.basemaps[this.model.get("name")] = {
          baseMapLayers: [{
              url: this.model.url + this.model.get("service")}
          ],
          thumbnailUrl: "blank",
          title: "Mapa General"
        };
    },
    render: function() {
        var extent = this.model.get("extent");
        this.map = new esri.Map(this.$el[0], _.extend({}, this.options, {
            basemap: this.model.get("name"),
            extent: new esri.geometry.Extent({
                "xmin": extent[0],
                "ymin": extent[1],
                "xmax": extent[2],
                "ymax": extent[3],
                "spatialReference": {
                    "wkid": this.model.get("wkid")
                }
            })
        }));
        var scalebar = new esri.dijit.Scalebar({
            map: this.map,
            scalebarUnit: 'metric'
        });
        var homeButton = new esri.dijit.HomeButton({
            map: this.map,
            extent: this.map.extent}, "HomeButton");
        homeButton.startup();
        this.listenTo(this.map, "basemap-change", this.handleBasemap);
        return this;
    },
    setBasemap: function(basemap) {
        if (!_.isUndefined(basemap)) {
            this.map.setBasemap(basemap);
        }
        else {
            this.map.setBasemap(this.model.get("name"));
        }
    },
    addLayer: function(layer) {
        this.map.addLayer(layer);
    },
    setSliderLabels: function(layer) {
        var labels = [];
        var lods = layer.tileInfo.lods;
        for (var i=0, il=lods.length; i<il; i++) {
          labels[i] = "1:" + Math.ceil(lods[i].scale);
        }
        esriConfig.defaults.map.sliderLabel = {
            tick: 0,
            labels: labels,
            style: "width:2em; font-family:Fresca; font-size:10pt; color:#444; padding-left:2px"
        };
        esriConfig.defaults.map.slider["height"] = (labels.length * 15) + 50 + "px";
    },
    handleBasemap: function(changed, old) {
        console.log("Changed basemap");
    }
});

module.exports = MapView;
