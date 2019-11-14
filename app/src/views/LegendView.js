/**
 * Legend view
 * @author agimenez
 */

/**
 * @class view.LegendView
 */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/query",
    "app/lib/ToolbarItem",
    "esri/dijit/Legend",
    "dojo/text!app/templates/legend_control.html"], function(declare, lang, query, ToolbarItem, Legend, templateString) {
    var LegendView = declare(ToolbarItem, {
        legend: null,
        constructor: function(options) {
            declare.safeMixin(this, {
                node: "legend",
                group: "toolbar-group"
            });
            this.inherited(arguments);
            query("#" + this.node).addContent(templateString);
        },
        show: function() {
            if (!this.legend) {
                this.legend = new Legend({
                    map: this.mapView.map
                }, "legendList");
                this.legend._legendUrl = this.legend._legendUrl.replace("http:", "https:");
                this.legend.startup();
                query(".showMap", this.node).on("click", lang.hitch(this, this.hide));
            }
            this.inherited(arguments);
        }
    });
    return LegendView;
});