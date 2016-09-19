var gulp    = require('gulp');
var $ = require('gulp-load-plugins')();
var paths   = require('./paths');

// Compilamos archivos CSS de terceros (ejemplo: boostrap.css) y 
// los metemos todos en un mismo archivo: vendor.css
// 
// Copiaremos ese archivo a: paths.dest + '/css'
gulp.task('vendor-styles', function() {
   gulp.src([
      paths.node + '/bootstrap/dist/css/bootstrap.min.css',
      paths.node + '/bootstrap/dist/css/bootstrap-theme.min.css'
    ])
    .pipe($.concat("vendor.css"))
    .pipe(gulp.dest(paths.dest + 'css/'));

  gulp.src(paths.node + '/bootstrap/dist/fonts/*')
      .pipe(gulp.dest(paths.dest + 'fonts/'));

});

// Compilamos archivos JS de terceros (ejemplo: boostrap.js) y 
// los metemos todos en un mismo archivo: vendor.js
// 
// Copiaremos ese archivo a: paths.dest + '/js'
gulp.task('vendor-scripts', function() {
  return gulp.src([
      paths.node + '/jquery/dist/jquery.min.js',
      paths.node + '/bootstrap/dist/js/bootstrap.min.js'
    ])
    .pipe($.plumber())
    //.pipe($.concat("vendor.js"))
    .pipe(gulp.dest(paths.dest + 'js/'));
});

module.exports = function() {
  gulp.start('vendor-styles');
  gulp.start('vendor-scripts');  
};
