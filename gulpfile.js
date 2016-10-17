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

// Ejecutamos estas tareas por defecto
gulp.task('build', ['assets', 'styles', 'dojo_dev']);

gulp.task('dist', ['dojo']);

// Ejecuta tareas por defecto y levanta server con endpoints de prueba
gulp.task('start', ['build'], require('./tasks/server'));
