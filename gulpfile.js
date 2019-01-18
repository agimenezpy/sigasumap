var gulp = require('gulp');

// clean
gulp.task('clean', require('./tasks/clean'));

// Build our assets
gulp.task('assets', require('./tasks/assets'));

// Dojo bundle
gulp.task('dojo', require('./tasks/dojo'));

// Dojo dev
gulp.task('app', require('./tasks/app'));

// Vendor
gulp.task('vendor', require('./tasks/vendor'));

// Ejecutamos estas tareas por defecto
gulp.task('build', ['assets-prod', 'vendor', 'app-prod']);

gulp.task('dev', ['assets-dev', 'app-dev']);

// Dist
gulp.task('dist', ['clean-build', 'dojo']);

// Ejecuta tareas por defecto y levanta server con endpoints de prueba
gulp.task('start', ['dev'], require('./tasks/server'));
