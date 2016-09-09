var gulp        = require('gulp');
var paths       = require('./paths');
var $           = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

gulp.task('styles', function() {
  return gulp.src(
      paths.src + '/styles/theme.less'
     )
    .pipe(less())
    .pipe($.sourcemaps.init())
    .pipe($.autoprefixer({ cascade: true }))
    .pipe($.sourcemaps.write())
    .pipe($.minifycss())
    .pipe(gulp.dest(paths.dest + '/css'))
    .pipe(reload({ stream: true }));

});

module.exports = function () {
    gulp.start("styles")
};
