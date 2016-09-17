var gulp  = require('gulp');
var $ = require('gulp-load-plugins')();
var paths = require('./paths');
var config = require('../app/config.json');

/**
 * Move assets to build
 */
module.exports = function() {
    "use strict";

    gulp.src(paths.src + '/images/**/*')
        .pipe(gulp.dest(paths.dest + '/images/'));

    var opts = { data: config };

    gulp.src(paths.src + 'index.html')
           .pipe($.processhtml(opts))
           .pipe(gulp.dest(paths.dest));
};
