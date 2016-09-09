var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var gutil       = require('gulp-util');
var browserify  = require('browserify');
var watchify    = require('watchify');
var jstify       = require('jstify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var paths       = require('./paths');

module.exports = function () {
  

  // set up the browserify instance on a task basis
  var bundler = browserify({
    entries: paths.src + '/main.js',
    debug: true,
    
    // Definir los transforms aqui va a evitar problemas con los streams.
    transform: [jstify],
    
    // Esto es para poder usar require
    // relativo al directorio con los
    // archivos JS de la aplicación.
    // Ejemplo
    // require('models/MiModelo')
    // en lugar de require('../models/MiModelo')
    // http://stackoverflow.com/questions/22434494/browserify-basedir-option-requirejs-like
    paths: [paths.src + '/js']
  });
  
  // Definimos los aliases para nuestros propios módulos.
  // Un alias es un nombre alternativo que se
  // usa para importar un módulo, en lugar de poner
  // la ruta completa
  // 1. Modulo para definir los templates
  bundler.require(paths.src + '/js/lib/templates.js', {expose: 'app-templates'});
  // 2. Plugins especificos de joko para jquery
  bundler.require(paths.src + '/js/lib/jquery-plugins.js', {expose: 'jquery.plugins'});

  bundler = watchify(bundler);

  var rebundle = function(file) {
    if (file) {
        file.map(function (fileName) {
           gutil.log('File updated', gutil.colors.yellow(fileName));
        });
    } 
    return bundler.transform(jstify).bundle()
      .on('error', $.util.log)
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe($.sourcemaps.init({loadMaps: true}))
      
        // Add transformation tasks to the pipeline here.
        .on('error', $.util.log)
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(paths.dest + '/js'));
  };

  bundler.on('update', rebundle);

  return rebundle();
};
