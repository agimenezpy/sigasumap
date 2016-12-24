/**
 * Locate view
 * @author agimenez
 */

/**
 * @class view.LocateView
 */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/query",
    "dojo/string",
    "app/lib/ToolbarItem",
    "app/models/LocateModel",
    "app/models/QueryModel",
    "dojo/text!app/templates/locator_address.html",
    "dojo/text!app/templates/locator_parcel.html",
    "dojo/text!app/templates/locator_control.html"], function(declare, lang, arrayUtils, query, string, ToolbarItem,
                                                              LocateModel, QueryModel, templateAddress, templateParcel,
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
            this.searchStreet = query("#address input.autocomplete")
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
                }),
                    new LocateModel({
                    map: this.map,
                    service: this.service[2],
                    callback: lang.hitch(this, this.onParcelResult)
                })];
                this.query = new QueryModel({
                    map: this.map
                });
                this.addressForm.on("submit", lang.hitch(this, this.searchAddress));
                this.parcelForm.on("submit", lang.hitch(this, this.searchParcel));
                this.searchStreet.typeahead({
                    source: lang.hitch(this, this.onAutoComplete),
                    minLength: 5,
                    items: 6
                });
            }
            this.map.infoWindow.hide();
            this.map.infoWindow.clearFeatures();
            this.clearResults();
            this.autocomplete = false;
            this.inherited(arguments);
        },
        onAutoComplete: function (query, callback) {
            if (!this.autocomplete) {
                this.autocomplete = true;
                var deferred = this.query.doSearch(query);
                var self = this;
                deferred.then(function (response) {
                    var names = self.query.onResult(response);
                    callback(names);
                    self.autocomplete = false;
                },
                function(err){
                    self.autocomplete = false;
                });
            }
        },
        clearResults: function () {
            this.map.infoWindow.hide();
            this.map.infoWindow.clearFeatures();
            query("#addressResults").empty();
            query("#parcelResults").empty();
        },
        searchAddress: function () {
            this.clearResults();
            var searchText = "";
            var number = string.trim(query("#numberText").val());
            if (number !== "") {
                searchText += number + " ";
            }
            var address = string.trim(query("#addressText").val());
            if (address !== "") {
                searchText += address.toUpperCase();
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
            var floor = string.trim(query("#floorText").val());
            if (floor !== "") {
                if (floor.match(/^[0-9]+$/)) {
                    floor = string.pad(floor, 2, "0");
                }
                else {
                    floor = string.pad(" ", 2, floor.charAt(0)).toUpperCase();
                }
            }
            var flat = string.trim(query("#flatText").val());
            if (flat !== "") {
                flat = string.pad(flat, 3, "0");
            }
            var locator = this.locators[1];
            if (floor !== "" && flat !== "") {
                searchText += floor + flat;
                locator = this.locators[2];
            }
            locator.doLocate(searchText);
        },
        onAddressResult: function (results) {
            this.onResult(results, "#addressResults");
        },
        onParcelResult: function (results) {
            this.onResult(results, "#parcelResults");
        },
        onResult: function (results, resultDiv) {
            if (results.length > 0) {
                this.map.infoWindow.setFeatures(arrayUtils.map(results, function(item) {
                    return item.graphic;
                }));
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