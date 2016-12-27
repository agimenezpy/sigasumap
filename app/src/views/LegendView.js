/**
 * Legend view
 * @author agimenez
 */

/**
 * @class view.LegendView
 */
define(["dojo/_base/declare",
    "app/lib/ToolbarItem",
    "esri/dijit/Legend"], function(declare, ToolbarItem, Legend) {
    var LegendView = declare(ToolbarItem, {
        legend: null,
        constructor: function(options) {
            declare.safeMixin(this, {
                node: "legend",
                group: "toolbar-group"
            });
            this.inherited(arguments);
        },
        show: function() {
            if (!this.legend) {
                this.legend = new Legend({
                    map: this.mapView.map
                }, this.node);
                this.legend.startup();
            }
            this.inherited(arguments);
        }
    });
    return LegendView;
});