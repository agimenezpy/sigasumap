/**
 * Find Model
 * @author agimenez
 */

/**
 * Tarea de busqueda
 *
 * @class models.FindModel
 */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/_base/Color",
    "dojo/string",
    "app/lib/LayerUtils",
    "esri/InfoTemplate",
    "esri/tasks/FindTask",
    "esri/tasks/FindParameters",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "dojo/text!app/templates/feature_result.html"],
    function(declare, lang, arrayUtils, Color, string, LayerUtils, InfoTemplate, FindTask, FindParameters,
             SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, templateString) {
    const FindModel = declare(null, {
        defaults: {
            returnGeometry: true,
            searchFields: ["NOMBRE_ZON", "nombre", "numero", "cuenta", "NOMBRE_DE_"]
        },
        service: null,
        map: null,
        constructor: function(options) {
            this.params = new FindParameters();
            lang.mixin(this.params, this.defaults);
            this.map = options.map;
            this.params.outSpatialReference = this.map.spatialReference;
            this.service = options.service;
            this.template = new InfoTemplate();
            this.template.setTitle("${layerName}");
            this.template.setContent(templateString);
            this.symbols = [new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10,
                                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                                new Color([255, 0, 0]), 1), new Color([0, 255, 0, 0.25])),
                            new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH, new Color([255, 0, 0]), 1),
                            new SimpleFillSymbol(SimpleFillSymbol.STYLE_NONE,
                                new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
                                    new Color([255, 0, 0]), 2),
                                new Color([255, 255, 0, 0.25]))];
        },
        doSearch: function(searchText) {
            var selected = this.map.basemapLayerIds[0];
            this.params.layerIds = LayerUtils.getLayerIds(this.map.getLayer(selected), /^Calle$/);
            this.params.searchText = searchText;

            var searchTask = new FindTask(this.service);
            var deferred = searchTask.execute(this.params);

            return deferred;
        },
        onResult: function(response) {
            var self = this;
            return arrayUtils.map(response, function (result) {
                var feature = result.feature;
                feature.attributes.layerName = result.layerName;
                var msg = "";
                for (var item in feature.attributes) {
                    if (!item.match("Shape.*|ID|layer")) {
                        msg += string.substitute("<label>${label}: </label><i>${value}</i><br>",
                            {label: item, value: feature.attributes[item]});
                    }
                }
                feature.attributes.extra = msg;
                feature.setInfoTemplate(self.template);
                feature.address = { name: result.value, layername: result.layerName };
                return feature;
            });
        }
    });
    return FindModel;
});
