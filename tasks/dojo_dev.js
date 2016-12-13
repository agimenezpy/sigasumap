var gulp  = require('gulp');
var $ = require('gulp-load-plugins')();
var paths = require('./paths');

gulp.task('app', ['clean-app'], function () {
   return gulp.src([
      paths.build + '/app/main.js'
    ])
    .pipe(gulp.dest(paths.dest + "/app/"));
});

gulp.task('dojo-dev', ['clean-app'], function () {
    return gulp.src(paths.src + 'src/**/*')
        .pipe(gulp.dest(paths.dest + '/app/src'));
});

gulp.task('app-dev', ['dojo-dev'], function () {
   return gulp.src(paths.src + '*.js*')
        .pipe(gulp.dest(paths.dest + '/app/'));
});

/**
 * Move assets to build
 */
module.exports = function() {
    "use strict";

    gulp.start('app-dev');
};
