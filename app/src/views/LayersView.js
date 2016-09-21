/**
 * Layers view
 * @author agimenez
 */

/**
 * @class view.LayersView
 */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "app/lib/ToolbarItem",
    "esri/request",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/dijit/LayerList"], function(declare, lang, arrayUtil, ToolbarItemView, esriRequest,
                                      ArcGISDynamicMapServiceLayer, LayerList) {
    const MyLayerList = declare(LayerList, {
         _getLayerTitle: function (e) {
             var title = e.layer.description || e.layer.layerInfos[0].name;
             if (title !== "") {
                 return title;
             }
             else {
                 return this.inherited(arguments);
             }
         }
    });
    const LayersView = declare(ToolbarItemView, {
        layerList: null,
        constructor: function(options) {
            declare.safeMixin(this, {
                node: "layers",
                action: "layers-action"
            });
            this.inherited(arguments);
            this.map = options.map;
        },
        show: function() {
            if (!this.layerList) {
                this.layerList = new MyLayerList({
                    showLegend: false,
                    showSubLayers: false,
                    showOpacitySlider: true,
                    map: this.map
                    }, this.node);
                var layersRequest = esriRequest({
                    url: CONFIG.root_url + "/Mapa_Web",
                    content: { f: "json" },
                    handleAs: "json",
                    callbackParamName: "callback"
                  });

                layersRequest.then(lang.hitch(this, this.buildLayers));
            }
            else {
                this.inherited(arguments);
            }
        },
        buildLayers: function(response) {
            var self = this;
            arrayUtil.forEach(response.services, function(item, index) {
                    if (item.name.match(/Mapa_General/) !== null) {
                        return;
                    }
                    var layer = new ArcGISDynamicMapServiceLayer(CONFIG.root_url + "/" + item.name + "/" + item.type, {
                                                                visible:false,
                                                                opacity:0.75,
                                                                description: item.name.split("/")[0]
                    });
                    self.layerList.map.addLayer(layer);
                }
            );
            this.layerList.startup();
            this.show();
        }
    });
    return LayersView;
});