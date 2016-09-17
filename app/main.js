/**
 *
 * @type Module backbone|Module backbone
 */
var _ = require("underscore");
var App = require('./src/application');
var config = require('config');
var esri = require('esri');


$(document).ready(function () {
    window.require([
        "esri/map",
        "esri/config",
        "esri/basemaps",
        "esri/geometry/Extent",
        "esri/dijit/Scalebar",
        "esri/dijit/HomeButton",
        "esri/dijit/Legend",
        "esri/dijit/Measurement",
        "esri/dijit/Popup",
        "esri/dijit/Basemap",
        "esri/dijit/BasemapLayer",
        "esri/dijit/BasemapGallery",
        "esri/dijit/Search",
        "esri/tasks/geometry",
        "esri/tasks/identify",
        "esri/tasks/find",
        "esri/tasks/locator",
        "esri/symbols/PictureMarkerSymbol",
        "esri/InfoTemplate",
        "dojo/domReady!"], function(Map, Config, Basemaps, Extent, Scalebar, HomeButton, Legend,
                                    Measurement, Popup, Basemap, BasemapLayer, BasemapGallery, Search,
                                    geometry, identify, find, locator, PictureMarkerSymbol, InfoTemplate) {
        _.extend(esri, {
            Map: Map,
            config: Config,
            basemaps: Basemaps,
            geometry: {
                Extent: Extent
            },
            dijit: {
                Scalebar: Scalebar,
                HomeButton: HomeButton,
                Legend: Legend,
                Measurement: Measurement,
                Popup: Popup,
                BasemapGallery: BasemapGallery,
                BasemapLayer: BasemapLayer,
                Basemap: Basemap,
                Search: Search
            },
            tasks: {
                geometry: geometry,
                identify: identify,
                find: find,
                Locator: locator
            },
            symbol: {
                PictureMarkerSymbol: PictureMarkerSymbol
            },
            InfoTemplate: InfoTemplate
        });
        var asu = new App(esri, config);
        asu.render();
    });
});
