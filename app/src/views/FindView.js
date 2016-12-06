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
    "dojo/query",
    "dojo/string",
    "dojo/dom-attr",
    "app/models/FindModel",
    "dojo/text!app/templates/search_control.html",
    "dojo/text!app/templates/search_result.html"], function(require, declare, lang, arrayUtils, query, string, domAttr,
                                                            FindModel, templateString, resultString) {
    const FindView = declare(null, {
        constructor: function(options) {
            this.map = options.map;
            this.service = options.service;
            query("#search").addContent(templateString);
            this.searchText = query("#searchText");
            this.searchResults = query("#searchResults");
            this.data = null;
        },
        show: function() {
            this.find = new FindModel({
                map: this.map,
                service: this.service
            });

            this.searchText.on("focus", lang.hitch(this, this.togglePanel));
            this.searchText.on("keypress", lang.hitch(this, this.doSearch));
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
            if (evt.which == 13 || evt.keyCode == 13) {
                this.hidePanel();
                this.data = null;
                var deferred = this.find.doSearch(this.searchText.val());
                deferred.addCallback(lang.hitch(this, this.showResults));
            }
        },
        showResults: function(response) {
            var results = this.find.onResultGroup(response);
            this.data = {};
            this.searchResults.empty();
            var count = 0;
            for (var group in results) {
                var rows = 0;
                this.data[group] = [];
                for (var result in results[group]) {
                    this.searchResults.addContent(string.substitute(resultString, {
                        id: group + "_" + rows++,
                        result: result,
                        group: group
                    }));
                    this.data[group].push(results[group][result]);
                }
                count++;
                if (count > 6) {
                    break;
                }
            }
            query("#searchResults a").on("click", lang.hitch(this, this.showFeature));
            this.showPanel();
        },
        showFeature: function(evt) {
            var key = domAttr.get(evt.target, "data-value").split("_");
            var feature = this.data[key[0]][key[1]];
            this.map.graphics.clear();
            for (var g = 0; g < feature["graphs"].length; g++) {
                this.map.graphics.add(feature["graphs"][g]);
            }
            this.map.setExtent(feature["ext"]);
            this.hidePanel();
        }
    });
    return FindView;
});