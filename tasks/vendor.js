var gulp    = require('gulp');
var $ = require('gulp-load-plugins')();
var paths   = require('./paths');

gulp.task('vendor-images', function() {
    gulp.src([
        paths.build + '/dojo/resources/*.gif'
    ])
    .pipe(gulp.dest(paths.dest + "/dojo/resources/"));

    gulp.src([
        paths.build + '/esri/themes/calcite/images/Measure_Area16.png',
        paths.build + '/esri/themes/calcite/images/Measure_Distance16.png',
        paths.build + '/esri/themes/calcite/images/Measure_Point16.png'
    ])
    .pipe(gulp.dest(paths.dest + "esri/themes/calcite/images/"));

    gulp.src([
        paths.build + '/esri/themes/calcite/images/loadingIndicator/LoadingAnimation16_Trans.gif'
    ])
    .pipe(gulp.dest(paths.dest + "esri/themes/calcite/images/loadingIndicator"));

    gulp.src([
        paths.build + '/esri/dijit/images/ajax-loader.gif',
        paths.build + '/esri/dijit/images/cursor16x24.png',
        paths.build + '/esri/dijit/images/esriGreenPin16x26.png',
        paths.build + '/esri/dijit/images/sdk_gps_location.png'
    ])
    .pipe(gulp.dest(paths.dest + "esri/dijit/images/"));

    gulp.src([
        paths.build + '/esri/images/basemap/hybrid.jpg',
        paths.build + '/esri/images/basemap/satellite.jpg',
        paths.build + '/esri/images/basemap/streets.jpg',
        paths.build + '/esri/images/basemap/osm.jpg'
    ])
    .pipe(gulp.dest(paths.dest + "esri/images/basemap"));


    return gulp.src([
        paths.build + '/esri/layers/vector-tile.js'
    ])
    .pipe(gulp.dest(paths.dest + "esri/layers/"));
});

gulp.task('vendor-styles', function() {
    gulp.src([
      paths.build + '/esri/themes/calcite/esri/esri.css'
    ])
    .pipe(gulp.dest(paths.dest + "esri/themes/calcite/esri/"));

    gulp.src([
      paths.build + '/esri/themes/calcite/dijit/icons/fonts/*'
    ])
    .pipe(gulp.dest(paths.dest + "esri/themes/calcite/dijit/icons/fonts"));

    gulp.src([
      paths.build + '/esri/dijit/LayerList/css/LayerList.css'
    ])
    .pipe(gulp.dest(paths.dest + "esri/dijit/LayerList/css/"));

   return gulp.src([
      paths.build + '/esri/themes/calcite/dijit/calcite.css'
    ])
    .pipe(gulp.dest(paths.dest + "esri/themes/calcite/dijit/"));
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
