/**
 * Print view
 * @author agimenez
 */

/**
 * @class view.PrintView
 */
define(["dojo/_base/declare",
    "app/lib/ToolbarItem",
    "esri/dijit/Print"], function(declare, ToolbarItemView, Print) {
    const PrintView = declare(ToolbarItemView, {
        print: null,
        constructor: function(options) {
            declare.safeMixin(this, {
                node: "print",
                action: "print-action",
                group: "toolbar-group"
            });
            this.inherited(arguments);
            this.map = options.map;
        },
        show: function() {
            if (!this.print) {
                this.print = new Print({
                    map: this.map,
                    url: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export Web Map Task"
                  }, "print");

                this.print.startup();

            }
            this.inherited(arguments);
        }
    });
    return PrintView;
});