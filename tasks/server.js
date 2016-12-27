var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var httpProxy = require('http-proxy');

// Corremos el sever con API de prueba
// 1. Construimos archivos de vendor
// 2. Construimos nuestros propios estilos
// 3. Construimos JS para navegadores (browserify)
module.exports = function() {
    'use strict';

    var proxy = httpProxy.createProxyServer({
         target: 'http://www.asuncion.gov.py/'
         //target: 'http://localhost:8399/'
    });

    proxy.on('proxyReq', function(proxyReq, req, res, options) {
        proxyReq.setHeader('Host', 'www.asuncion.gov.py');
        //proxyReq.setHeader('Host', 'localhost:9000');
    });

    var proxyMiddleware = function(req, res, next) {
        if (req.url.indexOf('arcgis') != -1) {
            proxy.web(req, res);
        } else {
            next();
        }
    };

    // Levanta un servidor HTTP
    // que ya tiene unos endpoints
    // de prueba implementados.
    browserSync({
      notify: false,
      port: 9000,
      ui: {
        port: 9001
      },
      server: {
        baseDir: ['dist']
      },
      middleware: [ proxyMiddleware ]
    });

    // miramos nuestro código
    // para detectar cambios y
    // recargar autom�ticamente
    gulp.watch([
      'app/*.html',
      'app/*.js',
      'app/src/**/*.js',
      'app/src/**/*.html',
      'app/less/**'
    ]).on('change', function() {
        gulp.start("dev", 'app-dev');
        reload();
    });
    
};
