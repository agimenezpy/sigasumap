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
    const SearchView = declare(null, {
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
                    map: this.map,
                    service: this.service
                });

                this.searchText.on("blur", lang.hitch(this, this.togglePanel));
                this.searchText.on("focus", lang.hitch(this, this.togglePanel));
                this.searchText.on("keydown", lang.hitch(this, this.doSearch));
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
        doSearch: function(evt){
            var keyCode = evt.which || evt.keyCode;
            if (keyCode == 13) {
                this.searchText.closest("div.form-group").addClass("loading");
                this.data = null;
                var deferred = this.find.doSearch(this.searchText.val());
                all(deferred).then(lang.hitch(this, this.showResults));
            }
            else if (keyCode == 8 || keyCode == 46) {
                this.data = null;
                this.searchResults.empty();
            }
            this.hidePanel();
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
                query("#searchResults a").on("click", lang.hitch(this, this.showFeature));
                this.searchNoResults.addClass("hidden");
            }
            else {
                this.data = null;
                this.searchNoResults.removeClass("hidden");
            }
            this.showPanel();
        },
        showFeature: function(evt) {
            var key = domAttr.get(evt.target, "data-value").split(":");
            var feature = this.data[key[0]][key[1]];
            this.map.graphics.clear();
            for (var g = 0; g < feature["graphs"].length; g++) {
                this.map.graphics.add(feature["graphs"][g]);
            }
            this.map.setExtent(feature["ext"]);
            this.hidePanel();
        }
    });
    return SearchView;
});