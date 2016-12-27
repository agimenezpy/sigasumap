/**
 * ToolbarItem
 * @author agimenez
 */

/**
 * @class lib.ToolbarItem
 */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/dom",
    "dojo/dom-class",
    "dojo/query",
    "dojo/dom-attr"], function(declare, lang, on, dom, domClass, query, dojoAttr) {
    var ToolbarItem = declare(null, {
        node: null,
        mapView: null,
        sideBar: true,
        constructor: function(options) {
            this.button = query("a[data-target='#" + this.node + "']");
            this.button.on("click", lang.hitch(this, this.toggle));
            this.mapView = options.mapView;
        },
        checked: function() {
            return domClass.contains(this.getMenuItem(), "active");
        },
        show: function() {
            query("#navigator-top li").removeClass("active");
            domClass.add(this.getMenuItem(), "active");
            if (this.sideBar) {
                this.mapView.open();
            }
            else {
                this.mapView.wide();
            }
            if (this.node !== null) {
                query("#tocPanel > div").addClass("hidden");
                domClass.remove(this.node, 'hidden');
            }
        },
        hide: function () {
            if (this.node !== null) {
                domClass.add(this.node, 'hidden');
            }
            this.mapView.wide();
            domClass.remove(this.getMenuItem(), "active");
        },
        toggle: function(event) {
            query('.navbar-collapse').removeClass('in');
            if (!this.checked()) {
                this.show();
            }
            else {
                this.hide();
            }
        },
        getMenuItem: function () {
            return this.button.closest("li")[0];
        }
    });
    return ToolbarItem;
});