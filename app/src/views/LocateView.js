/**
 * Locate view
 * @author agimenez
 */

/**
 * @class view.LocateView
 */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/query",
    "dojo/string",
    "app/lib/ToolbarItem",
    "app/models/LocateModel",
    "dojo/text!app/templates/locator_address.html",
    "dojo/text!app/templates/locator_parcel.html",
    "dojo/text!app/templates/locator_control.html"], function(declare, lang, query, string, ToolbarItem,
                                                              LocateModel, templateAddress, templateParcel,
                                                              templateString) {
    const LocateView = declare(ToolbarItem, {
        templateResultsCount: "<p class='text-info'>${count} Resultado(s) Encontrado(s)</p>",
        templateNoResults: "<p class='text-warning'>Resultados no encontrados</p>",
        constructor: function(options) {
            declare.safeMixin(this, {
                node: "locate",
                group: "toolbar-group"
            });
            this.inherited(arguments);
            this.map = this.mapView.map;
            this.service = options.service;
            query("#locate").addContent(templateString);
            query("#address").addContent(templateAddress);
            query("#parcel").addContent(templateParcel);
            query('#locatorTabs a').on("click", function (e) {
                e.preventDefault();
                query(this).tab('show');
            });
            this.addressForm = query("#address form");
            this.parcelForm = query("#parcel form");
        },
        show: function() {
            if (!this.locators) {
                this.locators = [new LocateModel({
                    map: this.map,
                    service: this.service[0],
                    callback: lang.hitch(this, this.onAddressResult)
                }),
                    new LocateModel({
                    map: this.map,
                    service: this.service[1],
                    callback: lang.hitch(this, this.onParcelResult)
                })];
                this.clearResults();
                this.addressForm.on("submit", lang.hitch(this, this.searchAddress));
                this.parcelForm.on("submit", lang.hitch(this, this.searchParcel));
            }
            this.inherited(arguments);
        },
        clearResults: function () {
            query("#addressResults").empty();
            query("#parcelResults").empty();
        },
        searchAddress: function () {
            this.clearResults();
            var searchText = "";
            var address = string.trim(query("#addressText").val());
            if (address !== "") {
                searchText += address.toUpperCase();
            }
            var number = string.trim(query("#numberText").val());
            if (number !== "") {
                searchText += " " + number;
            }
            var intersect = string.trim(query("#intersectionText").val());
            if (intersect !== "") {
                searchText += " & " + intersect.toUpperCase();
            }
            this.locators[0].doLocate(searchText);
        },
        searchParcel: function () {
            this.clearResults();
            var searchText = "";
            var zone = string.trim(query("#zoneText").val());
            if (zone !== "") {
                searchText += string.pad(zone, 2, "0");
            }
            var block = string.trim(query("#blockText").val());
            if (block !== "") {
                searchText += string.pad(block, 4, "0");
            }
            var parcel = string.trim(query("#parcelText").val());
            if (parcel !== "") {
                searchText += string.pad(parcel, 2, "0");
            }
            this.locators[1].doLocate(searchText);
        },
        onAddressResult: function (results) {
            this.onResult(results, "#addressResults");
        },
        onParcelResult: function (results) {
            this.onResult(results, "#parcelResults");
        },
        onResult: function (results, resultDiv) {
            if (results.length > 0) {
                var location = results[0].geom;
                this.map.infoWindow.setFeatures([results[0].graphic]);
                this.map.infoWindow.show(location);
                this.map.centerAndZoom(location, this.map.getMaxZoom());
                query(resultDiv).addContent(string.substitute(this.templateResultsCount, {
                    count: results.length
                }));
            }
            else {
                query(resultDiv).addContent(this.templateNoResults);
            }
        }
    });
    return LocateView;
});