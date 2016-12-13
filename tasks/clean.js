var gulp   = require('gulp');
var clean = require("gulp-clean");
var paths = require('./paths');

gulp.task('clean-all', function() {
    return gulp.src([
            paths.dest + "/*",
            paths.build + "/*"
            ], {read: false})
            .pipe(clean(paths.dest, paths.build));
});

gulp.task('clean-app', function() {
    return gulp.src(paths.dest + "/app/*", {read: false})
            .pipe(clean(paths.dest));
});

module.exports = function() {
    "use strict";

    gulp.start("clean-all");
};