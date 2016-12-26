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
    "dojo/text!app/templates/identify_control.html",
    "dojo/text!app/templates/identify_results.html",
    "dojo/text!app/templates/identify_row.html"], function(declare, lang, connect, query, string, ToolbarItem,
                                                           IdentifyModel, templateString, templateResults, templateRow) {
    const IdentifyView = declare(ToolbarItem, {
        identify: null,
        active: false,
        constructor: function(options) {
            declare.safeMixin(this, {
                node: "identify",
                group: "toolbar-group"
            });
            this.inherited(arguments);
            this.map = this.mapView.map;
            query("#identify").addContent(templateString);
            this.identifyResults = query("#identifyResults");
            this.identifyNoResults = query("#identifyNoResults");
        },
        hide: function () {
            this.active = false;
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
                this.active = true;
            }
            this.map.infoWindow.hide();
            this.map.infoWindow.clearFeatures();
            this.inherited(arguments);
        },
        showTable: function() {
            var feature = this.map.infoWindow.getSelectedFeature();
            if (feature && this.checked()) {
                this.identifyResults.empty();
                var content = "";
                var info = feature.attributes;
                for (var item in info) {
                    if (!item.match("Shape.*|ID|layer|display")) {
                        content += string.substitute(templateRow, {label: item, value: feature.attributes[item]});
                    }
                }
                this.identifyResults.addContent(string.substitute(templateResults, {
                    title: info.layerName, content: content
                }));
                this.identifyNoResults.addClass("hidden");
                this.identifyResults.removeClass("hidden");
            }
        },
        clearPanel: function () {
            if (this.checked()) {
                this.identifyResults.empty();
                this.identifyResults.addClass("hidden");
                this.identifyNoResults.removeClass("hidden");
            }
        },
        onIdentify: function(evt) {
            if (this.checked()) {
                this.map.infoWindow.clearFeatures();
                this.map.infoWindow.show(evt.mapPoint);
                var promises = this.identify.doIdentify(evt);
                this.map.infoWindow.setFeatures(promises);
            }
        }
    });
    return IdentifyView;
});