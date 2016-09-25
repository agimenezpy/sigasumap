/**
 * ToolbarItem view
 * @author agimenez
 */

/**
 * @class view.ToolbarItemView
 */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom",
    "dojo/dom-style",
    "dojo/query",
    "dojo/dom-attr",
    "dijit/registry"], function(declare, lang, dom, domStyle, query, dojoAttr, dijit) {
    const ToolbarItemView = declare(null, {
        node: null,
        action: null,
        group: "",
        constructor: function() {
            if (this.node !== null) {
                if (this.group !== "") {
                    query("#navigator-top .dijitToggleButton." + this.group).on("click", lang.hitch(this, 'uncheck'));
                }
                dijit.byId(this.action).on("click", lang.hitch(this, 'toggle'));
            }
        },
        show: function() {
            domStyle.set(this.node, 'display', '');
            var button = dijit.byId(this.action);
            if (!button.checked) {
                button.setChecked(true);
            }
        },
        hide: function () {
            domStyle.set(this.node, 'display', 'none');
            var button = dijit.byId(this.action);
            if (button.checked) {
                button.setChecked(false);
            }
        },
        toggle: function(evt) {
            if (dijit.byId(this.action).checked) {
                this.show();
            }
            else {
                this.hide();
            }
        },
        uncheck: function (evt) {
            var button = dijit.byId(this.action);
            var toggle = evt.target.parentNode;
            if (button.checked && dojoAttr.get(toggle, "widgetid") !== this.action) {
                this.hide();
            }
        }
    });
    return ToolbarItemView;
});