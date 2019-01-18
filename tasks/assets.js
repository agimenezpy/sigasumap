var gulp  = require('gulp');
var $ = require('gulp-load-plugins')();
var paths = require('./paths');
var config = require('../app/config.json');

function assets(prod) {
    gulp.src(paths.src + '/images/**/*')
        .pipe(gulp.dest(paths.dest + '/images/'));

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
    gulp.start("assets-dev");
};
