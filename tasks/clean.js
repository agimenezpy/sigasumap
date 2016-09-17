var gulp   = require('gulp');
var clean = require("gulp-clean");
var paths = require('./paths');

module.exports = function() {
    "use strict";

    return gulp.src(paths.dest + "/*", {read: false})
            .pipe(clean(paths.dest));
};