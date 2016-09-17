/**
 * Map view
 * @author agimenez
 */
var Backbone = require("backbone");
var esri = require("esri");

/**
 * @class view.BaseMapView
 */
const BaseMapView = Backbone.View.extend({
    template: require("templates/gallery.html"),
    className: "panel panel-default",
    initialize: function(options) {
        Backbone.View.prototype.initialize.apply(this, arguments);
        this.options = _.omit(options, "model", "el");
    },
    render: function() {
       this.$el.html(this.template());
        var basemapGallery = new esri.dijit.BasemapGallery({
            showArcGISBasemaps: true,
            map: this.options.map}, this.$el.find("#BasemapGallery")[0]);
        var basemap = esri.basemaps["asuncion"];
        var layer = new esri.dijit.BasemapLayer({
                url: basemap.baseMapLayers[0].url
        });
        basemapGallery.add(new esri.dijit.Basemap({
            layers: [layer],
            title: basemap.title,
            thumbnailUrl: basemap.thumbnailUrl}));
        basemapGallery.startup();
        return this;
    }
});

module.exports = BaseMapView;