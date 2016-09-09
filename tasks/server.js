var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

// Corremos el sever con API de prueba
// 1. Construimos archivos de vendor
// 2. Construimos nuestros propios estilos
// 3. Construimos JS para navegadores (browserify)
module.exports = function() {
  'use strict';

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
    }
  });

  // miramos nuestro código
  // para detectar cambios y
  // recargar autom�ticamente
  gulp.watch([
    'dist/*.html',
    'app/js/**/*.js',
    'app/js/**/*.html',
    'app/assets/**/*',
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.css', ['styles']);
    
};
