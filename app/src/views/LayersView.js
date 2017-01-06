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
    "dojo/query",
    "app/lib/ToolbarItem",
    "esri/request",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/dijit/LayerList",
    "dojo/text!app/templates/layers_control.html"], function(declare, lang, arrayUtil, query, ToolbarItem, esriRequest,
                                      ArcGISDynamicMapServiceLayer, LayerList, templateString) {
    var MyLayerList = declare(LayerList, {
         _getLayerTitle: function (e) {
             var title = e.layer.description;
             if (title === "" && e.layer.layerInfos.length > 0) {
                 title = e.layer.layerInfos[0].name;
             }
             if (title !== "") {
                 return title;
             }
             else {
                 return this.inherited(arguments);
             }
         }
    });
    var LayersView = declare(ToolbarItem, {
        layerList: null,
        constructor: function(options) {
            declare.safeMixin(this, {
                node: "layers",
                group: "toolbar-group"
            });
            this.inherited(arguments);
            query("#" + this.node).addContent(templateString);
        },
        show: function() {
            if (!this.layerList) {
                this.layerList = new MyLayerList({
                    showLegend: false,
                    showSubLayers: false,
                    showOpacitySlider: true,
                    map: this.mapView.map
                }, "layerList");
                var layersRequest = esriRequest({
                    url: CONFIG.root_url + "/Mapa_Web",
                    content: { f: "json" },
                    handleAs: "json",
                    callbackParamName: "callback"
                });

                layersRequest.then(lang.hitch(this, this.buildLayers));
                query(".showMap", this.node).on("click", lang.hitch(this, this.hide));
            }
            this.inherited(arguments);
        },
        buildLayers: function(response) {
            var self = this;
            arrayUtil.forEach(response.services, function(item) {
                    if (item.name.match(/Mapa_General|Mapa_Base/) !== null) {
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
