var gulp  = require('gulp');
var paths = require('./paths');

gulp.task('app-dev', ['clean-app'], function () {
   return gulp.src([
        paths.src + '**/*.js',
        paths.src + '**/*.html',
        paths.src + '**/*.json'
   ]).pipe(gulp.dest(paths.dest + '/app/'));
});

gulp.task('app-prod', ['clean-app'], function () {
   return gulp.src([
        paths.build + '/app/app.js',
        paths.src + '/main.js',
        paths.src + '/config.json'
   ]).pipe(gulp.dest(paths.dest + '/app/'));
});

/**
 * Move assets to build
 */
module.exports = function() {
    "use strict";

    gulp.start('app-dev');
};
