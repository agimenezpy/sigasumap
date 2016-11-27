/**
 * Measure view
 * @author agimenez
 */

/**
 * @class view.MeasureView
 */
define(["dojo/_base/declare",
    "dojo/dom",
    "dojo/query",
    "app/lib/ToolbarItem",
    "esri/units",
    "esri/dijit/Measurement",
    "dojo/text!app/templates/measurement.html"], function(declare, dom, query, ToolbarItem, units,
                                                          Measurement, templateString) {
    const MeasureView = declare(ToolbarItem, {
        measure: null,
        constructor: function(options) {
            declare.safeMixin(this, {
                node: "measure",
                action: "measure-action",
                hideOthers: false
            });
            dom.byId("measure").innerHTML = templateString;
            this.map = options.map;
            this.inherited(arguments);
        },
        show: function() {
            if (!this.measure) {
                this.measure = new Measurement({
                    map: this.map,
                    defaultAreaUnit: units.HECTARES,
                    defaultLengthUnit: units.KILOMETERS
                }, query("#" + this.node + " .panel-body")[0]);
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