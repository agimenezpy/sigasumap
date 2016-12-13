var gulp    = require('gulp');
var $ = require('gulp-load-plugins')();
var paths   = require('./paths');

gulp.task('vendor-images', function() {
    gulp.src([
      paths.build + '/dojo/resources/*.gif'
    ])
    .pipe(gulp.dest(paths.dest + "/dojo/resources/"));

    return gulp.src([
      paths.build + '/esri/dijit/images/*'
    ])
    .pipe(gulp.dest(paths.dest + "esri/dijit/images/"));
});

gulp.task('vendor-styles', function() {
    gulp.src([
      paths.build + '/esri/css/esri.css'
    ])
    .pipe(gulp.dest(paths.dest + "/esri/css/"));

   return gulp.src([
      paths.build + '/dijit/themes/claro/claro.css'
    ])
    .pipe(gulp.dest(paths.dest + "/dijit/themes/"));
});

gulp.task('vendor-scripts', function() {
    gulp.src([
      paths.build + '/dojo/dojo.js'
    ])
    .pipe(gulp.dest(paths.dest + "/dojo/"));

    gulp.src([
      paths.build + '/esri/esri.js'
    ])
    .pipe(gulp.dest(paths.dest + "/esri/"));

    return gulp.src([
      paths.build + '/bootstrap/bootstrap.js'
    ])
    .pipe(gulp.dest(paths.dest + "/bootstrap"));
});

module.exports = function() {
  gulp.start('vendor-images', 'vendor-styles', 'vendor-scripts');
};
