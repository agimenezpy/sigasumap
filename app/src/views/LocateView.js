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
    var LocateView = declare(ToolbarItem, {
        templateResultsCount: "<p class='text-success'>${count} Resultado(s) Encontrado(s)</p>",
        templateNoResults: "<p class='text-muted'>No se encontraron resultados</p>",
        templateError: "<p class='text-danger'>Error al contactar con el servidor</p>",
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
            this.searchStreet = query("#address input.autocomplete");
        },
        show: function() {
            if (!this.locators) {
                this.locators = [new LocateModel({
                    map: this.map,
                    service: this.service[0]
                }),
                    new LocateModel({
                    map: this.map,
                    service: this.service[1]
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
                this.searchStreet.on("blur", lang.hitch(this, this.cancelAutoComplete));
                query("form input.form-control").on("change", lang.hitch(this, this.toggleClearIcon));
                query("form .clear-input").on("click", lang.hitch(this, this.clearInput));
            }
            this.map.infoWindow.hide();
            this.map.infoWindow.clearFeatures();
            this.clearResults();
            this.isAutoComplete = false;
            this.inherited(arguments);
        },
        onAutoComplete: function (query, callback) {
            if (!this.isAutoComplete) {
                this.isAutoComplete = true;
                var self = this;
                this.deferred && !this.deferred.isFulfilled() && this.deferred.reject();
                this.deferred = this.query.doSearch(query);
                this.deferred.then(function (response) {
                    var names = self.query.onResult(response);
                    callback(names);
                    self.isAutoComplete = false;
                },
                function(err){
                    self.isAutoComplete = false;
                });
            }
        },
        cancelAutoComplete: function() {
            this.isAutoComplete = false;
            this.deferred && !this.deferred.isFulfilled() && this.deferred.reject();
            this.deferred = null;
        },
        toggleClearIcon: function(event) {
            var input = query(event.target);
            var clear = input.siblings(".clear-input");
            if (string.trim(input.val()) === "") {
                clear.addClass("hidden");
            }
            else {
                clear.removeClass("hidden");
            }
            input.parents(".form-group.has-error").removeClass("has-error");
            input.siblings("span.help-block").html("");
        },
        clearInput: function(event) {
            var clear = query(event.target);
            var input = clear.siblings("input.form-control");
            input.val("");
            clear.addClass("hidden");
        },
        clearResults: function () {
            this.map.infoWindow.hide();
            this.map.infoWindow.clearFeatures();
            query("#addressResults").empty();
            query("#parcelResults").empty();
            this.cancelAutoComplete();
        },
        searchAddress: function (event) {
            event.preventDefault();
            this.clearResults();
            if (!this.validateForm(this.addressForm)) {
                return;
            }

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
            var deferred = this.locators[0].doLocate(searchText);
            deferred.then(lang.hitch(this, this.onAddressResult),
                          lang.partial(lang.hitch(this, this.onError),
                                       "#addressResults"));
        },
        searchParcel: function (event) {
            event.preventDefault();
            this.clearResults();
            if (!this.validateForm(this.parcelForm)) {
                return;
            }

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
            var deferred = locator.doLocate(searchText);
            deferred.then(lang.hitch(this, this.onParcelResult),
                          lang.partial(lang.hitch(this, this.onError),
                                      "#parcelResults"));
        },
        onAddressResult: function (response) {
            var results = this.locators[0].onResult(response);
            this.onResult(results, "#addressResults");
        },
        onParcelResult: function (response) {
            var results = this.locators[1].onResult(response);
            this.onResult(results, "#parcelResults");
        },
        validateForm: function (form) {
            form.children(".form-group").removeClass("has-error");
            query("span.help-block", form[0]).html("");
            arrayUtils.forEach(query("input.form-control", form[0]), function(item) {
                var input = query(item);
                var value = string.trim(input.val());
                if (input.attr("data-required")[0] === "true"
                    && value === "") {
                    input.parents(".form-group").addClass("has-error");
                    input.siblings("span.help-block").html("Este valor es requerido");
                }

                if (input.attr("type")[0] === "number"
                    && value !== ""
                    && !/^\d+$/.test(value)) {
                    input.parents(".form-group").addClass("has-error");
                    input.siblings("span.help-block").html("Este valor debe ser un número");
                }
            });
            return form.children(".has-error").length == 0;
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
        },
        onError: function(resultDiv, error) {
            if (error && error.response.status !== 200) {
                query(resultDiv).addContent(this.templateError);
            }
        }
    });
    return LocateView;
});