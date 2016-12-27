/**
 * Print Model
 * @author agimenez
 */

/**
 * Tarea de impresión
 *
 * @class models.PringModel
 */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "esri/tasks/PrintTemplate",
    "esri/dijit/Print",
    "esri/request",
    "esri/config"], function(declare, lang, arrayUtils, PrintTemplate, Print, esriRequest, esriConfig) {
    var PrintModel = declare(null, {
        service: null,
        map: null,
        node: null,
        print: null,
        constructor: function(options, srcNodeRef) {
            this.map = options.map;
            this.service = options.service;
            this.node = srcNodeRef;
            esriConfig.defaults.io.corsEnabledServers = ["sampleserver6.arcgisonline.com"];
        },
        startup: function() {
            var printInfo = esriRequest({
                "url": this.service,
                "content": { "f": "json" }
            });
            printInfo.then(lang.hitch(this, this.onPrintInfo));
        },
        onPrintInfo: function(resp) {
            var layoutTemplate, templateNames, mapOnlyIndex, templates;

            layoutTemplate = arrayUtils.filter(resp.parameters, function (param, idx) {
                return param.name === "Layout_Template";
            });

            if (layoutTemplate.length === 0) {
                return;
            }
            templateNames = layoutTemplate[0].choiceList;

            // remove the MAP_ONLY template then add it to the end of the list of templates
            mapOnlyIndex = arrayUtils.indexOf(templateNames, "MAP_ONLY");
            if (mapOnlyIndex > -1) {
                var mapOnly = templateNames.splice(mapOnlyIndex, mapOnlyIndex + 1)[0];
                templateNames.push(mapOnly);
            }

            // create a print template for each choice
            templates = arrayUtils.map(templateNames, function (ch) {
                var plate = new PrintTemplate();
                plate.layout = plate.label = ch;
                plate.format = "PDF";
                plate.outSR = plate.processSR = 32721;
                plate.layoutOptions = {
                    "authorText": "SIG Municipal",
                    "copyrightText": "Municipalidad de Asunción",
                    "legendLayers": [],
                    "titleText": "Mapa de Asunción",
                    "scalebarUnit": "Kilometers"
                };
                return plate;
            });

            this.print = new Print({
                map: this.map,
                url: this.service,
                templates: templates
            }, this.node);
            this.print.startup();
        }
    });
    return PrintModel;
});
