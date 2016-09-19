var gulp  = require('gulp');
var $ = require('gulp-load-plugins')();
var paths = require('./paths');

/**
 * Move assets to build
 */
module.exports = function() {
    "use strict";

    gulp.src(paths.src + 'src/**/*')
        .pipe(gulp.dest(paths.dest + '/app/src'));

    gulp.src(paths.src + '*.js*')
        .pipe(gulp.dest(paths.dest + '/app/'));
};
