/**
 * Main Application
 *
 * @author agimenez
 */
var $ = require('jquery');
var MapView = require("views/map_view");
var BasemapView = require("views/basemap_view");
var SearchView = require("views/search_view");

/**
 * @class js.Application
 */
const Application = Backbone.View.extend({
    el: "#main-region",
    template: require("templates/layout.html"),
    initialize: function(options) {
    },
    render: function() {
        $("#loading-mask").hide();
        this.$el.append(this.template());
        this.mapView = new MapView({
            el: "#mapDiv",
            slider: true,
            logo: false,
            fitExtent: true
        }).render();
        this.baseView = new BasemapView({
            map: this.mapView.map,
            showArcGISBasemaps: true
        });
        this.$el.find("div.row > :first").html(this.baseView.render().el);
        this.searchView = new SearchView({
            map: this.mapView.map
        }).render();
        return this;
    }
});

module.exports = Application;
