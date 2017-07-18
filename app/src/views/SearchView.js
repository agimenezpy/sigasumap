/**
 * Search view
 * @author agimenez
 */

/**
 * @class view.SearchView
 */
define([
    "require",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/promise/all",
    "dojo/query",
    "dojo/string",
    "dojo/dom-attr",
    "app/models/FindModel",
    "dojo/text!app/templates/search_control.html",
    "dojo/text!app/templates/search_result.html"], function(require, declare, lang, arrayUtils, all, query, string,
                                                            domAttr, FindModel, templateString, resultString) {
    var SearchView = declare(null, {
        constructor: function(options) {
            this.map = options.map;
            this.service = options.service;
            query("#search").addContent(templateString);
            this.searchText = query("#searchText");
            this.searchResults = query("#searchResults");
            this.searchNoResults = query("#searchNoResults");
            this.data = null;
        },
        show: function() {
            if (!this.find) {
                this.find = new FindModel({
                    map: this.map
                });

                this.searchText.on("blur", lang.hitch(this, this.togglePanel()));
                this.searchText.on("focus", lang.hitch(this, this.togglePanel));
                this.searchText.on("keydown", lang.hitch(this, this.doSearch));
                this.searchText.on("change", lang.hitch(this, this.onChangeSearch));
                this.searchText.siblings(".clear-input").on("click", lang.hitch(this, this.clearInput));
            }
        },
        togglePanel: function () {
            if (this.data !== null) {
                this.showPanel();
            }
            else {
                this.hidePanel();
            }
        },
        showPanel: function () {
            query("#search .panel").removeClass('hidden');
        },
        hidePanel: function () {
            query("#search .panel").addClass('hidden');
        },
        onChangeSearch: function(event) {
            var input = query(event.target);
            var clear = input.siblings(".clear-input");
            if (string.trim(input.val()) === "") {
                clear.addClass("hidden");
            }
            else {
                clear.removeClass("hidden");
            }
        },
        cancelSearch: function() {
            this.deferred && !all(this.deferred).isFulfilled() && arrayUtils.forEach(this.deferred, function (item) {
                item.reject();
            });
            this.searchText.closest("div.form-group").removeClass("loading");
            this.isSearching = false;
            this.data = null;
            this.hidePanel();
        },
        clearInput: function(event) {
            var clear = query(event.target);
            var input = clear.siblings("input.form-control");
            input.val("");
            clear.addClass("hidden");
            this.cancelSearch();
        },
        doSearch: function(evt){
            var keyCode = evt.which || evt.keyCode;
            if (keyCode == 13) {
                if (this.isSearching) {
                    return;
                }
                this.cancelSearch();
                this.isSearching = true;
                this.searchText.closest("div.form-group").addClass("loading");
                this.deferred = this.find.doSearch(this.searchText.val());
                all(this.deferred).then(
                    lang.hitch(this, this.showResults),
                    lang.hitch(this, this.onError)
                );
            }
            else {
                this.cancelSearch();
            }
        },
        groupResults: function (response) {
            var results = {};
            arrayUtils.forEach(response, function(item) {
                lang.mixin(results, this.find.onResultGroup(item));
            }, this);
            return results;
        },
        showResults: function(response) {
            var results = this.groupResults(response);
            this.data = {};
            this.searchResults.empty();
            var count = 0;
            for (var group in results) {
                var rows = 0;
                this.data[group] = [];
                for (var result in results[group]) {
                    this.searchResults.addContent(string.substitute(resultString, {
                        id: group + ":" + rows++,
                        result: result,
                        group: group
                    }));
                    this.data[group].push(results[group][result]);
                    count++;
                    if (count > 6) {
                        break;
                    }
                }
            }
            this.searchText.closest("div.form-group").removeClass("loading");
            if (count > 0) {
                query("#searchResults div.content").on("click", lang.hitch(this, this.showFeature));
                this.searchNoResults.addClass("hidden");
            }
            else {
                this.data = null;
                this.searchNoResults.removeClass("hidden");
            }
            this.isSearching = false;
            this.showPanel();
        },
        showFeature: function(evt) {
            var key = domAttr.get(query(evt.target).closest("div.content")[0], "data-value").split(":");
            var feature = this.data[key[0]][key[1]];
            this.map.graphics.clear();
            for (var g = 0; g < feature["graphs"].length; g++) {
                this.map.graphics.add(feature["graphs"][g]);
            }
            var ext = feature["ext"];
            if (ext.getWidth() == 0
                && ext.getHeight() == 0 && this.map.getZoom() < 10) {
                var self = this;
                this.map.setZoom(10).then(function () {
                    self.map.setExtent(ext);
                });
            }
            else {
                this.map.setExtent(ext);
            }
            this.hidePanel();
        },
        onError: function(error) {
            if (error && error.response.status !== 200) {
                this.data = null;
                this.searchResults.empty();
                this.searchNoResults.removeClass("hidden");
                this.searchText.closest("div.form-group").removeClass("loading");
                this.showPanel();
            }
        }
    });
    return SearchView;
});