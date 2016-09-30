/**
 * Identify view
 * @author agimenez
 */

/**
 * @class view.IdentifyView
 */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "app/lib/ToolbarItem",
    "app/models/IdentifyModel"], function(declare, lang, ToolbarItem, IdentifyModel) {
    const IdentifyView = declare(ToolbarItem, {
        identify: null,
        constructor: function(options) {
            declare.safeMixin(this, {
                action: "identify-action",
                group: "toolbar-group"
            });
            this.inherited(arguments);
            this.map = options.map;
            this.service = CONFIG.root_url + options.service;
        },
        hide: function () {
            this.map.infoWindow.hide();
            this.inherited(arguments);
        },
        show: function() {
            if (!this.identify) {
                this.identify = new IdentifyModel({
                     map: this.map,
                     service: this.service
                 });
                this.map.on("click", lang.hitch(this, this.onIdentify));
            }
            this.inherited(arguments);
        },
        onIdentify: function(evt) {
            if (this.checked()) {
                this.identify.doIdentify(evt);
            }
        }
    });
    return IdentifyView;
});