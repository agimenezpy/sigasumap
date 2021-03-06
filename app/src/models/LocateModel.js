/**
 * Locate Model
 * @author agimenez
 */

/**
 * Tarea de ubicación
 *
 * @class models.LocateModel
 */
define(["require",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/_base/Color",
    "esri/graphic",
    "esri/InfoTemplate",
    "esri/tasks/locator",
    "esri/symbols/PictureMarkerSymbol",
    "dojo/text!app/templates/locator_result.html"],
    function(require, declare, lang, arrayUtils, Color, Graphic, InfoTemplate, Locator,
             PictureMarkerSymbol, templateString) {
    var LocateModel = declare(null, {
        defaults: {
            singleLineFieldName: "Single Line Input",
            outFields: ["Match_addr"]
        },
        service: null,
        map: null,
        highlightSymbol: new PictureMarkerSymbol(require.toUrl("esri") + "/dijit/images/sdk_gps_location.png", 36, 36).setOffset(9, 18),
        infoTemplate: new InfoTemplate("Ubicación", templateString),
        constructor: function(options) {
            this.map = options.map;
            this.service = options.service;
        },
        doLocate: function(searchText) {
            var locator = new Locator(this.service);
            var params = {
                address: {"Single Line Input": searchText}
            };
            lang.mixin(params, this.defaults);
            locator.outSpatialReference = this.map.spatialReference;
            return locator.addressToLocations(params);
        },
        onResult: function(response) {
            return arrayUtils.map(
                arrayUtils.filter(response, function (result) {
                    return result.score > 50;
                }),
                this.onFeature, this);
        },
        onFeature: function (result) {
            var attributes = { address: result.address, score:result.score};
            var graphic = new Graphic(result.location, this.highlightSymbol,
                attributes, this.infoTemplate);
            var feature = {};
            feature["graphic"] = graphic;
            feature["displayFieldName"] = result.address + " (" + result.score + ")";
            feature["geom"] = result.location;
            return feature;
        }
    });
    return LocateModel;
});
