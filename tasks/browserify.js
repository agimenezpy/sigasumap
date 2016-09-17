var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var gutil       = require('gulp-util');
var browserify  = require('browserify');
var watchify    = require('watchify');
var jstify      = require('jstify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var paths       = require('./paths');

module.exports = function () {
    // set up the browserify instance on a task basis
    var bundler = browserify({
    entries: paths.src + '/main.js',
    debug: true,
    transform: [jstify],
    paths: [paths.src + '/src']
    });

    bundler.require(paths.src + '/src/lib/esri.js', {expose: 'esri'});
    bundler.require(paths.src + 'config.json', {expose: 'config'});

    bundler = watchify(bundler);

    var rebundle = function(file) {
    if (file) {
        file.map(function (fileName) {
           gutil.log('File updated', gutil.colors.yellow(fileName));
        });
    }
    return bundler.bundle()
        .on('error', $.util.log)
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe($.sourcemaps.init({loadMaps: true}))

        // Add transformation tasks to the pipeline here.
        .on('error', $.util.log)
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dest + '/js'));
    };

    bundler.on('update', rebundle);

    return rebundle();
};
