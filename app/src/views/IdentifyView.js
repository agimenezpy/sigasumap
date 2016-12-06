/**
 * Identify view
 * @author agimenez
 */

/**
 * @class view.IdentifyView
 */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/connect",
    "dojo/query",
    "dojo/string",
    "app/lib/ToolbarItem",
    "app/models/IdentifyModel",
    "dojo/text!app/templates/identify_control.html"], function(declare, lang, connect, query, string,
                                                               ToolbarItem, IdentifyModel, templateString) {
    const IdentifyView = declare(ToolbarItem, {
        identify: null,
        constructor: function(options) {
            declare.safeMixin(this, {
                node: "identify",
                action: "identify-action",
                group: "toolbar-group"
            });
            this.inherited(arguments);
            this.map = this.mapView.map;
            query("#identify").addContent(templateString);
            this.identifyResults = query("#identifyResults");
        },
        hide: function () {
            this.map.infoWindow.hide();
            this.inherited(arguments);
        },
        show: function() {
            if (!this.identify) {
                this.identify = new IdentifyModel({
                     map: this.map,
                     service: CONFIG.root_url + this.mapView.model.get("service")
                 });
                this.map.on("click", lang.hitch(this, this.onIdentify));
                connect.connect(this.map.infoWindow, "onSelectionChange", lang.hitch(this, this.showTable));
                connect.connect(this.map.infoWindow, "onClearFeatures", lang.hitch(this, this.clearPanel));
            }
            this.inherited(arguments);
        },
        showTable: function() {
            var feature = this.map.infoWindow.getSelectedFeature();
            this.identifyResults.empty();
            for (var item in feature.attributes) {
                if (!item.match("Shape.*|ID|layer|display")) {
                    this.identifyResults.addContent(string.substitute(
                        "<label>${label}: </label><i>${value}</i><br>", {
                            label: item,
                            value: feature.attributes[item]
                    }));
                }
            }
        },
        clearPanel: function () {
            this.identifyResults.empty();
        },
        onIdentify: function(evt) {
            if (this.checked()) {
                this.identify.doIdentify(evt);
            }
        }
    });
    return IdentifyView;
});