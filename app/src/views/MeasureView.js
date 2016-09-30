/**
 * Measure view
 * @author agimenez
 */

/**
 * @class view.MeasureView
 */
define(["dojo/_base/declare",
    "app/lib/ToolbarItem",
    "esri/dijit/Measurement"], function(declare, ToolbarItem, Measurement) {
    const MeasureView = declare(ToolbarItem, {
        measure: null,
        constructor: function(options) {
            declare.safeMixin(this, {
                node: "measure",
                action: "measure-action",
                hideOthers: false
            });
            this.inherited(arguments);
            this.map = options.map;
        },
        show: function() {
            if (!this.measure) {
                this.measure = new Measurement({
                    map: this.map
                    }, this.node);
                this.measure.startup();
            }
            this.inherited(arguments);
        }
    });
    return MeasureView;
});