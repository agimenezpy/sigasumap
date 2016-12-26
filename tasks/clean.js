var gulp   = require('gulp');
var clean = require("gulp-clean");
var paths = require('./paths');

gulp.task('clean-build', function() {
    return gulp.src([
            paths.build + "/*"
            ], {read: false})
            .pipe(clean(paths.build));
});

gulp.task('clean-dist', function() {
    return gulp.src([
            paths.dest + "/*"
            ], {read: false})
            .pipe(clean(paths.dest));
});

gulp.task('clean-app', function() {
    return gulp.src(paths.dest + "/app/*", {read: false})
            .pipe(clean(paths.dest));
});

module.exports = function() {
    "use strict";

    gulp.start("clean-build", "clean-dist");
};