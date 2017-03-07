var gulp        = require('gulp');
var paths       = require('./paths');
var $           = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var minifyCSS = require('gulp-minify-css');
var reload      = browserSync.reload;

module.exports = function () {
    "use strict";

    gulp.src(
        paths.bower + 'semantic/src/theme.config.example'
    )
    .pipe($.rename("theme.config"))
    .pipe(gulp.dest(paths.bower + 'semantic/src/'));

    return gulp.src(
        paths.src + '/less/asu.less'
    )
    .pipe($.less())
    .pipe($.sourcemaps.init())
    .pipe($.autoprefixer({ cascade: true }))
    .pipe($.sourcemaps.write())
    .pipe(minifyCSS())
    .pipe($.rename("theme.min.css"))
    .pipe(gulp.dest(paths.dest + '/css'))
    .pipe(reload({ stream: true }));

};
