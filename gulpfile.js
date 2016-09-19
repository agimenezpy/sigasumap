'use strict';

var gulp = require('gulp');

// clean
gulp.task('clean',require('./tasks/clean'));

// Build our assets
gulp.task('assets',require('./tasks/assets'));

// Dojo bundle
gulp.task('dojo', require('./tasks/dojo'));

// Dojo dev
gulp.task('dojo_dev', require('./tasks/dojo_dev'));

// Less & CSS styles
gulp.task('styles', require('./tasks/styles'));

// External JS files
gulp.task('vendor', require("./tasks/vendor"));

// Ejecutamos estas tareas por defecto
gulp.task('build', ['assets', 'vendor', 'styles', 'dojo_dev']);

// Ejecuta tareas por defecto y levanta server con endpoints de prueba
gulp.task('start', ['build', 'dojo_dev'], require('./tasks/server'));
