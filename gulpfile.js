'use strict';

var gulp = require('gulp');

// clean
gulp.task('clean',require('./tasks/clean'));

// Build our assets
gulp.task('assets',require('./tasks/assets'));

// Dojo bundle
gulp.task('dojo', require('./tasks/dojo'));

// Dojo dev
gulp.task('app_dev', require('./tasks/app_dev'));

// Less & CSS styles
gulp.task('styles', require('./tasks/styles'));

// Vendor
gulp.task('vendor', require('./tasks/vendor'));

// Ejecutamos estas tareas por defecto
gulp.task('build', ['assets', 'styles', 'vendor']);

// Dist
gulp.task('dist', ['clean', 'dojo', 'app_dev']);

// Ejecuta tareas por defecto y levanta server con endpoints de prueba
gulp.task('start', ['build', 'app_dev'], require('./tasks/server'));
