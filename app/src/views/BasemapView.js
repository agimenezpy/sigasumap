/**
 * Basemap view
 * @author agimenez
 */

/**
 * @class view.BaseMapView
 */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/query",
    "app/lib/ToolbarItem",
    "esri/basemaps",
    "esri/dijit/Basemap",
    "esri/dijit/BasemapLayer",
    "esri/dijit/BasemapGallery",
    "dojo/text!app/templates/gallery_control.html"], function(declare, lang, arrayUtils, query, 
                                           ToolbarItem, esriBasemaps,
                                           Basemap, BasemapLayer, BasemapGallery, templateString) {
    var BasemapView = declare(ToolbarItem, {
        basemapGallery: null,
        isVisible: false,
        constructor: function(options) {
            declare.safeMixin(this, {
                node: "gallery",
                action: "basemap-action",
                group: "toolbar-group"
            });
            this.inherited(arguments);
            query("#" + this.node).addContent(templateString);
            this.mapView = options.mapView;
            this.basemapGallery = new BasemapGallery({
                showArcGISBasemaps: false,
                map: this.mapView.map
            }, "galleryList");
            arrayUtils.forEach([this.mapView.model.get("name"), "osm", "satellite", "hybrid"], function(key) {
                var basemap = esriBasemaps[key];
                var layer = new BasemapLayer({
                    url: basemap.baseMapLayers[0].url,
                    copyright: basemap.baseMapLayers[0].copyright,
                    type: basemap.baseMapLayers[0].type
                });
            this.basemapGallery.add(new Basemap({
                id: key,
                layers: [layer],
                title: basemap.title,
                thumbnailUrl: basemap.thumbnailUrl
            }));
            }, this);
            this.basemapGallery.select(this.mapView.model.get("name"));
            //this.basemapGallery.on("selection-change", lang.hitch(this, this.basemapChange));
        },
        show: function() {
            if (!this.isVisible) {
                this.isVisible = true;
                this.basemapGallery.startup();
                query(".showMap", this.node).on("click", lang.hitch(this, this.hide));
            }
            this.inherited(arguments);
        },
        basemapChange: function() {
            this.mapView.setBasemap(this.basemapGallery.getSelected());
        }
   });
    return BasemapView;
});
