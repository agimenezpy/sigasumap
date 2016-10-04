/**
 * Measure view
 * @author agimenez
 */

/**
 * @class view.MeasureView
 */
define(["dojo/_base/declare",
    "app/lib/ToolbarItem",
    "esri/units",
    "esri/dijit/Measurement"], function(declare, ToolbarItem, units, Measurement) {
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
                    map: this.map,
                    defaultAreaUnit: units.HECTARES,
                    defaultLengthUnit: units.KILOMETERS
                }, this.node);
                this.measure.startup();
            }
            this.inherited(arguments);
        },
        hide: function() {
            this.measure.clearResult();
            var tool = this.measure.getTool();
            if (tool !== undefined) {
                this.measure.setTool(tool.toolName, false);
            }
            this.inherited(arguments);
        }
    });
    return MeasureView;
});