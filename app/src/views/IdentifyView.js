/**
 * Identify view
 * @author agimenez
 */

/**
 * @class view.IdentifyView
 */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/Color",
    "dojo/dom",
    "dojo/dom-construct",
    "app/lib/ToolbarItem",
    "app/models/IdentifyModel",
    "esri/dijit/Popup",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/dijit/Popup"
    ], function(declare, lang, Color, dom, domConstruct, ToolbarItemView, IdentifyModel,
                Popup, SimpleFillSymbol, SimpleLineSymbol) {
    const IdentifyView = declare(ToolbarItemView, {
        identify: null,
        constructor: function(options) {
            declare.safeMixin(this, {
                action: "identify-action"
            });
            this.inherited(arguments);
            this.map = options.map;
            this.service = CONFIG.root_url + options.service;
        },
        show: function() {
            if (!this.identify) {
                this.map.infoWindow = new Popup({
                    fillSymbol: new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                                new Color([255,0,0]), 2),
                                new Color([255,255,0,0.25]))
                }, domConstruct.create("div", null, dom.byId("map")));
                this.map.infoWindow.setMap(this.map);
                this.map.infoWindow.startup();
                this.identify = new IdentifyModel({
                     map: this.map,
                     service: this.service
                 });
                this.map.on("click", lang.hitch(this, this.onIdentify));
            }
            this.inherited(arguments);
        },
        onIdentify: function(evt) {
            if (this.checked()) {
                this.identify.doIdentify(evt);
            }
        }
    });
    return IdentifyView;
});