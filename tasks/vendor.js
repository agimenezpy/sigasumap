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

    return gulp.src([
        paths.build + '/esri/dijit/images/ajax-loader.gif',
        paths.build + '/esri/dijit/images/cursor16x24.png',
        paths.build + '/esri/dijit/images/esriGreenPin16x26.png',
        paths.build + '/esri/dijit/images/sdk_gps_location.png'
    ])
    .pipe(gulp.dest(paths.dest + "esri/dijit/images/"));
});

gulp.task('vendor-styles', function() {
    gulp.src(paths.node + 'calcite-maps/dist/css/calcite-maps-bootstrap.min-v0.9.css')
        .pipe(gulp.dest(paths.dest + '/css/'));

    gulp.src(paths.node + 'calcite-maps/dist/css/calcite-maps-arcgis-4.x.min-v0.9.css')
        .pipe(gulp.dest(paths.dest + '/css/'));

    gulp.src(paths.node + 'calcite-maps/dist/fonts/**/*')
        .pipe(gulp.dest(paths.dest + '/fonts/'));

    gulp.src([
      paths.node + '/arcgis-js-api/css/main.css'
    ])
    .pipe(gulp.dest(paths.dest + "esri/css/"));

    gulp.src([
      paths.node + '/esri/themes/calcite/dijit/icons/fonts/*'
    ])
    .pipe(gulp.dest(paths.dest + "esri/themes/calcite/dijit/icons/fonts"));

    gulp.src([
      paths.node + '/esri/dijit/LayerList/css/LayerList.css'
    ])
    .pipe(gulp.dest(paths.dest + "esri/dijit/LayerList/css/"));

   return gulp.src([
      paths.node + '/esri/themes/calcite/dijit/calcite.css'
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

});

module.exports = function() {
  gulp.start('vendor-images', 'vendor-styles', 'vendor-scripts');
};
