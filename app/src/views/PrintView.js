/**
 * Print view
 * @author agimenez
 */

/**
 * @class view.PrintView
 */
define(["dojo/_base/declare",
    "dojo/query",
    "app/lib/ToolbarItem",
    "app/models/PrintModel",
    "dojo/text!app/templates/print_dialog.html"], function(declare, query, ToolbarItemView, PrintModel, templateString) {
    var PrintView = declare(ToolbarItemView, {
        print: null,
        service: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export Web Map Task",
        constructor: function(options) {
            declare.safeMixin(this, {
                node: "print",
                group: "toolbar-group"
            });
            this.inherited(arguments);
            query("#print").addContent(templateString);
        },
        show: function() {
            if (!this.print) {
                this.print = new PrintModel({
                    map: this.mapView.map,
                    service: this.service
                }, "printButton");
                this.print.startup();
            }
            this.inherited(arguments);
        }
    });
    return PrintView;
});