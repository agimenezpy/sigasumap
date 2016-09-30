/**
 * Print view
 * @author agimenez
 */

/**
 * @class view.PrintView
 */
define(["dojo/_base/declare",
    "dojo/dom",
    "app/lib/ToolbarItem",
    "app/models/PrintModel",
    "dojo/text!app/templates/print_dialog.html"], function(declare, dom, ToolbarItemView, PrintModel, templateString) {
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
            dom.byId("print").innerHTML = templateString;
        },
        show: function() {
            if (!this.print) {
                this.print = new PrintModel({
                    map: this.map,
                    service: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export Web Map Task"
                }, "printButton");
                this.print.startup();
            }
            this.inherited(arguments);
        }
    });
    return PrintView;
});