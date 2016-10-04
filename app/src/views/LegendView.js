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
    const LegendView = declare(ToolbarItem, {
        legend: null,
        constructor: function(options) {
            declare.safeMixin(this, {
                node: "legend",
                action: "legend-action",
                group: "toolbar-group"
            });
            this.inherited(arguments);
            this.mapView = options.mapView;
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