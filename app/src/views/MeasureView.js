/**
 * Measure view
 * @author agimenez
 */

/**
 * @class view.MeasureView
 */
define(["dojo/_base/declare",
    "dojo/query",
    "app/lib/ToolbarItem",
    "esri/units",
    "esri/dijit/Measurement",
    "dojo/text!app/templates/measurement.html"], function(declare, query, ToolbarItem, units,
                                                          Measurement, templateString) {
    var MeasureView = declare(ToolbarItem, {
        measure: null,
        constructor: function(options) {
            declare.safeMixin(this, {
                node: "measure",
                sideBar: false
            });
            this.inherited(arguments);
            query("#measure").addContent(templateString);
        },
        show: function() {
            if (!this.measure) {
                this.measure = new Measurement({
                    map: this.mapView.map,
                    defaultAreaUnit: units.HECTARES,
                    defaultLengthUnit: units.METERS
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