var gulp  = require('gulp');
var paths = require('./paths');

gulp.task('app-dev', ['clean-app'], function () {
   return gulp.src([
        paths.src + '**/*.js',
        paths.src + '**/*.html',
        paths.src + '**/*.json'
   ]).pipe(gulp.dest(paths.dest + '/app/'));
});

/**
 * Move assets to build
 */
module.exports = function() {
    "use strict";

    gulp.start('app-dev');
};
