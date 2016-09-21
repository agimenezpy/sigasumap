/**
 * Basemap view
 * @author agimenez
 */

/**
 * @class view.BaseMapView
 */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "app/lib/ToolbarItem",
    "esri/basemaps",
    "esri/dijit/Basemap",
    "esri/dijit/BasemapLayer",
    "esri/dijit/BasemapGallery"], function(declare, lang, ToolbarItemView, esriBasemaps, Basemap, BasemapLayer,
                                           BasemapGallery) {
    const BasemapView = declare(ToolbarItemView, {
        basemapGallery: null,
        constructor: function(options) {
            declare.safeMixin(this, {
                node: "gallery",
                action: "basemap-action"
            });
            this.inherited(arguments);
            this.map = options.map;
        },
        show: function() {
            if (!this.basemapGallery) {
                this.basemapGallery = new BasemapGallery({
                    showArcGISBasemaps: true,
                    map: this.map
                    }, this.node);
                var basemap = esriBasemaps["asuncion"];
                var layer = new BasemapLayer({
                    url: basemap.baseMapLayers[0].url,
                    copyright: basemap.baseMapLayers[0].copyright
                });
                this.basemapGallery.add(new Basemap({
                    layers: [layer],
                    title: basemap.title,
                    thumbnailUrl: basemap.thumbnailUrl
                }));
                this.basemapGallery.startup();
            }
            this.inherited(arguments);
        }
    });
    return BasemapView;
});