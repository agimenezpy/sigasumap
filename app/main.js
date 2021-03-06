/**
 *
 * @type Module backbone|Module backbone
 */

require([
    "dojo/_base/declare",
    "dojo/json",
    "app/views/LoadingView",
    "app/Application",
    "app/lib/GoogleAnalytics",
    "dojo/text!./app/config.json",
    "bootstrap/Collapse",
    "bootstrap/Tab",
    "bootstrap/Popover",
    "bootstrap/Tooltip",
    "bootstrap/Typeahead",
    "dojo/domReady!"], function(declare, JSON, LoadingView, Application,
                                GoogleAnalytics, config) {

    window.CONFIG = JSON.parse(config);

    var asu = new Application();
    asu.startup();

    var ga = new GoogleAnalytics();
    ga.startup();

    var loading = new LoadingView("loadingOverlay");
    loading.endLoading();
});
