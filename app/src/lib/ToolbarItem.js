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
    const ToolbarItem = declare(null, {
        node: null,
        action: null,
        mapView: null,
        group: "",
        constructor: function() {
            if (this.group !== "") {
                query("#navigator-top .btn-ico." + this.group).on("click", lang.hitch(this, 'uncheck'));
            }
            if (this.action !== null) {
                this.button = dom.byId(this.action);
                on(this.button, "click", lang.hitch(this, 'toggle'));
            }
        },
        checked: function() {
            return domClass.contains(this.button.parentNode, "active");
        },
        show: function() {
            if (this.node !== null) {
                domClass.remove(this.node, 'hidden');
            }
            if (!this.checked()) {
                domClass.add(this.button.parentNode, "active");
            }
            if (this.mapView !== null) {
                this.mapView.open();
            }
        },
        hide: function () {
            if (this.node !== null) {
                domClass.add(this.node, 'hidden');
            }
            if (this.checked()) {
                domClass.remove(this.button.parentNode, "active");
            }
            if (this.mapView !== null) {
                this.mapView.wide();
            }
        },
        toggle: function() {
            if (!this.checked()) {
                this.show();
            }
            else {
                this.hide();
            }
        },
        uncheck: function (evt) {
            var toggle = evt.target.parentNode;
            if (this.checked() && dojoAttr.get(toggle, "id") !== this.action) {
                this.hide();
            }
        }
    });
    return ToolbarItem;
});