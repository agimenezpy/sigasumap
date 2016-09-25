/**
 * Legend view
 * @author agimenez
 */

/**
 * @class view.LegendView
 */
define(["dojo/_base/declare",
    "app/lib/ToolbarItem",
    "esri/dijit/Legend"], function(declare, ToolbarItemView, Legend) {
    const LegendView = declare(ToolbarItemView, {
        legend: null,
        constructor: function(options) {
            declare.safeMixin(this, {
                node: "legend",
                action: "legend-action",
                group: "toolbar-group"
            });
            this.inherited(arguments);
            this.map = options.map;
        },
        show: function() {
            if (!this.legend) {
                this.legend = new Legend({
                    map: this.map
                    }, this.node);
                this.legend.startup();
            }
            this.inherited(arguments);
        }
    });
    return LegendView;
});