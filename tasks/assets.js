var gulp  = require('gulp');
var $ = require('gulp-load-plugins')();
var paths = require('./paths');
var config = require('../app/config.json');
var extend = require('util')._extend;

function assets(prod) {
    gulp.src(paths.src + '/images/**/*')
        .pipe(gulp.dest(paths.dest + '/images/'));

    gulp.src(paths.bower + 'bootstrap/fonts/**/*')
        .pipe(gulp.dest(paths.dest + '/fonts/'));

    config['env'] = prod ? 'prod' : 'dev';
    var opts = {
        data: config
    };

    return gulp.src(paths.src + 'index.html')
           .pipe($.processhtml(opts))
           .pipe(gulp.dest(paths.dest));
}

gulp.task('assets-dev', function() {
    assets(false)
});

gulp.task('assets-prod', function() {
    assets(true)
});

/**
 * Move assets to build
 */
module.exports = function() {
    "use strict";
    gulp.start("assets-dev");
};
