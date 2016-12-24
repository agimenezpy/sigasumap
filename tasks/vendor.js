var gulp    = require('gulp');
var $ = require('gulp-load-plugins')();
var paths   = require('./paths');

gulp.task('vendor-images', function() {
    gulp.src([
        paths.build + '/dojo/resources/*.gif'
    ])
    .pipe(gulp.dest(paths.dest + "/dojo/resources/"));

    gulp.src([
        paths.build + '/dijit/themes/claro/images/spriteArrows.png'
    ])
    .pipe(gulp.dest(paths.dest + "/dijit/themes/claro/images/"));

    gulp.src([
        paths.build + '/dijit/themes/claro/form/images/commonFormArrows.png',
        paths.build + '/dijit/themes/claro/form/images/buttonArrows.png',
        paths.build + '/dijit/themes/claro/form/images/sliderThumbs.png'
    ])
    .pipe(gulp.dest(paths.dest + "/dijit/themes/claro/form/images/"));

    return gulp.src([
        paths.build + '/esri/dijit/images/home.png',
        paths.build + '/esri/dijit/images/locate.png',
        paths.build + '/esri/dijit/images/ajax-loader.gif',
        paths.build + '/esri/dijit/images/cursor16x24.png',
        paths.build + '/esri/dijit/images/esriGreenPin16x26.png',
        paths.build + '/esri/dijit/images/Measure_Area16.png',
        paths.build + '/esri/dijit/images/Measure_Distance16.png',
        paths.build + '/esri/dijit/images/Measure_Point16.png',
        paths.build + '/esri/dijit/images/sdk_gps_location.png',
        paths.build + '/esri/dijit/images/button-hover.png',
        paths.build + '/esri/dijit/images/button-active.png',
        paths.build + '/esri/dijit/images/home-spinner.gif ',
        paths.build + '/esri/dijit/images/locate-spinner.gif'
    ])
    .pipe(gulp.dest(paths.dest + "esri/dijit/images/"));
});

gulp.task('vendor-styles', function() {
    gulp.src([
      paths.build + '/esri/css/esri.css'
    ])
    .pipe(gulp.dest(paths.dest + "/esri/css/"));

    gulp.src([
      paths.build + '/esri/dijit/font/*'
    ])
    .pipe(gulp.dest(paths.dest + "esri/dijit/font/"));

   return gulp.src([
      paths.build + '/dijit/themes/claro/claro.css'
    ])
    .pipe(gulp.dest(paths.dest + "/dijit/themes/claro"));
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
