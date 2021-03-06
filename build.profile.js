/**
 * Based on the dojo-boilerplate
 * https://github.com/csnover/dojo-boilerplate
 * and https://github.com/tomwayson/esri-slurp-example
 *
 * Please refer to the Dojo Build tutorial for more details
 * http://dojotoolkit.org/documentation/tutorials/1.10/build/
 * Look to `util/build/buildControlDefault.js` for more information on available options and their default values.
 */

var esriDeps = [
    "dijit/form/HorizontalSlider",
    "dijit/form/HorizontalRuleLabels",
    "esri/map",
    "esri/basemaps",
    "esri/config",
    "esri/request",
    "esri/InfoTemplate",
    "esri/dijit/LayerList",
    "esri/dijit/Legend",
    "esri/dijit/Scalebar",
    "esri/dijit/HomeButton",
    "esri/dijit/LocateButton",
    "esri/dijit/Attribution",
    "esri/dijit/Measurement",
    "esri/dijit/Search",
    "esri/dijit/Print",
    'esri/dijit/Attribution',
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/geometry/Extent",
    "esri/tasks/FindTask",
    "esri/tasks/FindParameters",
    "esri/tasks/IdentifyTask",
    "esri/tasks/IdentifyParameters",
    "esri/tasks/PrintTemplate",
    "esri/tasks/GeometryService",
    "esri/tasks/locator",
    "esri/tasks/find",
    "esri/symbols/PictureMarkerSymbol"
];

var profile = {
    // `basePath` is relative to the directory containing this profile file; in this case, it is being set to the
    // src/ directory, which is the same place as the `baseUrl` directory in the loader configuration.
    basePath: 'bower_components',

    // Builds a new release.
    action: 'release',

    // Strips all comments and whitespace from CSS files and inlines @imports where possible.
    cssOptimize: 'comments',

    // Excludes tests, demos, and original template files from being included in the built version.
    mini: true,

    // Uses Closure Compiler or "uglify" as the JavaScript minifier. This can also be set to "shrinksafe" to use ShrinkSafe,
    // though ShrinkSafe is deprecated and not recommended.
    // This option defaults to "" (no compression) if not provided.
    optimize: 'closure',

    // We're building layers, so we need to set the minifier to use for those, too.
    // This defaults to "shrinksafe" if not provided.
    layerOptimize: 'closure',

  // A list of packages that will be built. The same packages defined in the loader should be defined here in the
  // build profile.
  packages: [
    {
        name: 'app',
        location: '../app/src'
    },
    {
        name: 'bootstrap',
        location: 'dojo-bootstrap'
    },
    'dijit',
    'dojo',
    'dojox',
    'dstore',
    'dgrid',
    'xstyle',
    'put-selector',
    'esri', {
      name: 'moment',
      location: 'moment',
      main: 'moment',
      trees: [
          // don't bother with .hidden, tests, min, src, and templates
          [".", ".", /(\/\.)|(~$)|(test|txt|src|min|templates)/]
      ],
      resourceTags: {
        amd: function(filename, mid){
          return /\.js$/.test(filename);
        }
      }
    }
  ],

    // Build source map files to aid in debugging.
    // This defaults to true.
    useSourceMaps: false,

    // If present and truthy, instructs the loader to consume the cache of layer member modules
    noref: true,

    // Strips all calls to console functions within the code. You can also set this to "warn" to strip everything
    // but console.error, and any other truthy value to strip everything but console.warn and console.error.
    // This defaults to "normal" (strip all but warn and error) if not provided.
    stripConsole: 'none', // if set to "all" will remove all console messages, include warnings and errors.

    // The default selector engine is not included by default in a dojo.js build in order to make mobile builds
    // smaller. We add it back here to avoid that extra HTTP request. There is also an "acme" selector available; if
    // you use that, you will need to set the `selectorEngine` property in index.html, too.
    selectorEngine: 'acme',

    // Any module in an application can be converted into a "layer" module, which consists of the original module +
    // additional dependencies built into the same file. Using layers allows applications to reduce the number of HTTP
    // requests by combining all JavaScript into a single file.
    layers: {
        // This is the main loader module. It is a little special because it is treated like an AMD module even though
        // it is actually just plain JavaScript. There is some extra magic in the build system specifically for this
        // module ID.
        'dojo/dojo': {
            // By default, the build system will try to include `dojo/main` in the built `dojo/dojo` layer, which adds
            // a bunch of stuff we do not want or need. We want the initial script load to be as small and quick to
            // load as possible, so we configure it as a custom, bootable base.
            boot: true,
            customBase: true,
            include: [
                // dependencies of esri/map that will be requested if not included
                'dojox/gfx/path',
                'dojox/gfx/svg',
                'dojox/gfx/filters',
                'dojox/gfx/svgext',
                'dojox/gfx/shape',
                'dojo/NodeList-data',
                'dojo/NodeList-manipulate',
                'dojo/NodeList-traverse',
                'dojo/json',
                'dojo/text',
                'dojo/domReady',
                'dojo/request/xhr',
                'dojo/number'
            ],
            // You can define the locale for your application if you like
            includeLocales: ['es-es']
        },
        'esri/esri': {
            include: esriDeps,
            includeLocales: ['es-es']
        },
        'bootstrap/bootstrap': {
            include: [
                'bootstrap/Support',
                'bootstrap/Collapse',
                'bootstrap/Tooltip',
                'bootstrap/Popover',
                'bootstrap/Tab',
                'bootstrap/Typeahead'
            ]
        },
        'moment/moment': {
            include: ['moment/locale/es']
        },
        'app/app': {
            include: [
                'app/Application',
                'app/lib/GoogleAnalytics',
                'app/lib/LayerUtils',
                'app/lib/ResizedMap',
                'app/lib/ToolbarItem',
                'app/models/FindModel',
                'app/models/IdentifyModel',
                'app/models/LocateModel',
                'app/models/MapModel',
                'app/models/PrintModel',
                'app/models/SearchModel',
                'app/views/IdentifyView',
                'app/views/LayersView',
                'app/views/LegendView',
                'app/views/LoadingView',
                'app/views/LocateView',
                'app/views/MapView',
                'app/views/MeasureView',
                'app/views/PrintView',
                'app/views/SearchView'
            ],
            exclude: esriDeps
        }
    },
    // Providing hints to the build system allows code to be conditionally removed on a more granular level than simple
    // module dependencies can allow. This is especially useful for creating tiny mobile builds. Keep in mind that dead
    // code removal only happens in minifiers that support it! Currently, only Closure Compiler to the Dojo build system
    // with dead code removal. A documented list of has-flags in use within the toolkit can be found at
    // <http://dojotoolkit.org/reference-guide/dojo/has.html>.
    staticHasFeatures: {
        // The trace & log APIs are used for debugging the loader, so we do not need them in the build.
        'dojo-trace-api': 0,
        'dojo-log-api': 0,

        // This causes normally private loader data to be exposed for debugging. In a release build, we do not need
        // that either.
        'dojo-publish-privates': 0,

        // This application is pure AMD, so get rid of the legacy loader.
        'dojo-sync-loader': 0,

        // `dojo-xhr-factory` relies on `dojo-sync-loader`, which we have removed.
        'dojo-xhr-factory': 0,

        // We are not loading tests in production, so we can get rid of some test sniffing code.
        'dojo-test-sniff': 0,
        'extend-esri': 0,

        "config-deferredInstrumentation": 0,
        "config-dojo-loader-catches": 0,
        "config-tlmSiblingOfDojo": 0,
        "dojo-amd-factory-scan": 0,
        "dojo-combo-api": 0,
        "dojo-config-api": 1,
        "dojo-config-require": 0,
        "dojo-debug-messages": 0,
        "dojo-dom-ready-api": 1,
        "dojo-firebug": 0,
        "dojo-guarantee-console": 1,
        "dojo-has-api": 1,
        "dojo-inject-api": 1,
        "dojo-loader": 1,
        "dojo-modulePaths": 0,
        "dojo-moduleUrl": 0,
        "dojo-requirejs-api": 0,
        "dojo-sniff": 1,
        "dojo-timeout-api": 0,
        "dojo-undef-api": 0,
        "dojo-v1x-i18n-Api": 1,
        "dom": 1,
        "host-browser": 1,
        "extend-dojo": 1
    },
    defaultConfig: {
        parseOnLoad: true,
        deps: [],//'app/main'],
        hasCache: {
            'extend-esri': 0,
            'dojo-has-api': 1,
            'dojo-undef-api': 0
        },
        packages: [{
            name: 'moment',
            location: 'moment',
            main: 'moment'
        }]
    }
};
