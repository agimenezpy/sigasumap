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
    "esri/layers/FeatureLayer",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/dijit/LayerList",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/TextSymbol",
    "esri/renderers/SimpleRenderer",
    "esri/layers/LabelClass",
    "esri/Color",
    "dojo/text!app/templates/layers_control.html"], function(declare, lang, arrayUtil, query, ToolbarItem,
        esriRequest, FeatureLayer, ArcGISDynamicMapServiceLayer, LayerList,
        SimpleLineSymbol, SimpleFillSymbol, TextSymbol, SimpleRenderer, LabelClass, Color,
        templateString) {
    var MyLayerList = declare(LayerList, {
         _getLayerTitle: function (e) {
             var title = e.layer.description;
             if (title === "" && e.layer.layerInfos && e.layer.layerInfos.length > 0) {
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
                var layer = new ArcGISDynamicMapServiceLayer(
                                CONFIG.base_url + 
                                CONFIG.root_url + "/" +
                                item.name + "/" + item.type, {
                                visible: false,
                                opacity: 0.75,
                                description: item.name.split("/")[0]
                });
                self.layerList.map.addLayer(layer);
            });
            var statesColor = new Color("#c6c6c6");
            var statesLine = new SimpleLineSymbol("solid", statesColor, 1.5);
            var statesSymbol = new SimpleFillSymbol("solid", statesLine, null);
            var statesRenderer = new SimpleRenderer(statesSymbol);
            var layer = new FeatureLayer(
                CONFIG.base_url + 
                CONFIG.root_url + "/" +
                "Mapas/Mapa_Base/MapServer/29", {
                    outFields: ["numero"],
                    mode: FeatureLayer.MODE_ONDEMAND
                });
            layer.setRenderer(statesRenderer);

            var statesLabel = new TextSymbol().setColor(new Color("#ccc"));
            statesLabel.font.setSize("14pt");
            statesLabel.font.setFamily("arial");

            //this is the very least of what should be set within the JSON  
            var json = {
                "labelExpressionInfo": {"value": "{numero}"}
            };

            //create instance of LabelClass (note: multiple LabelClasses can be passed in as an array)
            var labelClass = new LabelClass(json);
            labelClass.symbol = statesLabel; // symbol also can be set in LabelClass' json
            layer.setLabelingInfo([ labelClass ])

            //this.layerList.map.addLayer(layer);
            this.layerList.startup();
            this.show();
        }
    });
    return LayersView;
});
