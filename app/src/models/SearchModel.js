/**
 * ToolbarItem
 * @author agimenez
 */

/**
 * @class lib.Search
 */
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/dom-attr",
    "dojo/query",
    "dojo/Deferred",
    "dijit/focus",
    "esri/promiseList",
    "esri/dijit/Search"], function(declare, lang, arrays, domAttr, query, deferred, focus, promise, Search) {
    const MySearch = declare(Search, {
        _suggest: function(event) {
            var source = this.sources[event.index];
            if (source.finder) {
                event || (event = {
                    index: this.activeSourceIndex,
                    text: this.value
                });
                var t = new deferred,
                    search = "",
                    size = 0;
                if (event.hasOwnProperty("text") && event.text) {
                    search = lang.trim(event.text);
                    size = event.text.length;
                }
                var length = source.minCharacters || this.minCharacters;
                if (size > length) {
                    var self = this;
                    source.finder.doSearch(search).then(lang.hitch(this, function (queryResult) {
                        var result;
                        var features = source.finder.onResult(queryResult);
                        if (features) {
                            result = this._hydrateResults(features, event.index, !0);
                        }
                        t.resolve(result);
                    }));
                }
                else {
                    t.resolve();
                }
                return t.promise;
            }
            else {
                return this.inherited(arguments);
            }
        },
        _suggestionsEvent: function(event, idx) {
            var source = domAttr.get(idx, "data-source-index");
            source = parseInt(source, 10);
            if (this.sources[source].finder) {
                var row = parseInt(domAttr.get(idx, "data-index"), 10),
                    a = query("li", this.suggestionsNode),
                    c = arrays.indexOf(a, idx);
                var d = this.suggestResults[source][row];
                d.index = source;
                d[this._objectIdIdentifier] = d.feature.attributes["OBJECTID"];
                this.search(d);
                focus.focus(this.inputNode);
            }
            else {
                return this.inherited(arguments);
            }
        },
        _search : function (e) {
            e || (e = {
                text : this.value,
                magicKey : null,
                geometry : null,
                point : null,
                index : this.activeSourceIndex,
                latlon : null
            });
            var source = this.sources[e.index];
            var t = new deferred;
            if (source.finder) {
                e.length = 1;
                t.resolve(e);
                return t.promise;
            }
            else {
                return this.inherited(arguments);
            }
        },
        search : function (e) {
            var t = new deferred;
            return this._mapLoaded().then(lang.hitch(this, function () {
                this._searchDeferred(e).then(lang.hitch(this, function (e) {
                    var s = e.results;
                    this.set("searchResults", s),
                    0 === e.numResults && (this._noResults(e.value), this._showNoResultsMenu()),
                    this._hideLoading(),
                    this.emit("search-results", e),
                    this._selectFirstResult(s, e.activeSourceIndex),
                    t.resolve(s)
                }), lang.hitch(this, function (e) {
                    t.reject(e)
                }))
            })), t.promise
        }
    });
    return MySearch;
});