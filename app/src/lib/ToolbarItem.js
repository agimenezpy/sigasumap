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
    "dojo/dom-class",
    "dojo/query"], function(declare, lang, dom, domStyle, domClass, query) {
    const ToolbarItemView = declare(null, {
        node: null,
        action: null,
        constructor: function() {
            if (this.node !== null) {
                query(".navbar-nav .btn-link").on("click", lang.hitch(this, 'hide'));
                query("." + this.action).on("click", lang.hitch(this, 'show'));
            }
        },
        show: function() {
            domStyle.set(this.node, 'display', '');
        },
        hide: function () {
            domStyle.set(this.node, 'display', 'none');
        },
        toggle: function(evt) {
            var li = evt.target.parentNode;
            if (domClass.contains(li, "active")) {
                domClass.remove(li, "active");
                this.hide();
            }
            else {
                domClass.add(li, "active");
                this.show();
            }
        }
    });
    return ToolbarItemView;
});