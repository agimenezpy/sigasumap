/**
 * Basemap view
 * @author agimenez
 */

/**
 * @class view.BaseMapView
 */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom",
    "dojo/dom-style",
    "dojo/dom-class",
    "dojo/query",
    "esri/basemaps",
    "esri/dijit/Basemap",
    "esri/dijit/BasemapLayer",
    "esri/dijit/BasemapGallery"], function(declare, lang, dom, domStyle, domClass, query,
                                           esriBasemaps, Basemap, BasemapLayer, BasemapGallery) {
    const BasemapView = declare(null, {
        basemapGallery: null,
        galleryNode: dom.byId("gallery"),
        constructor: function(options) {
            this.map = options.map;
            query(".gallery-action").on("click", lang.hitch(this, 'toggle'))
        },
        show: function() {
            if (!this.basemapGallery) {
                this.basemapGallery = new BasemapGallery({
                    showArcGISBasemaps: true,
                    map: this.map
                }, this.galleryNode);
                var basemap = esriBasemaps["asuncion"];
                var layer = new BasemapLayer({
                    url: basemap.baseMapLayers[0].url
                });
                this.basemapGallery.add(new Basemap({
                    layers: [layer],
                    title: basemap.title,
                    thumbnailUrl: basemap.thumbnailUrl
                }));
                this.basemapGallery.startup();
            }
            domStyle.set(this.galleryNode, 'display', '');
        },
        hide: function () {
            domStyle.set(this.galleryNode, 'display', 'none');
        },
        toggle: function(evt) {
            var li = evt.target.parentNode;
            if (domClass.contains(li, "active")) {
                domClass.remove(li, "active");
                this.hide();
            }
            else {
                domClass.add(li, "active");
                this.show();
            }
        }
    });
    return BasemapView;
});