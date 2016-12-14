var gulp = require('gulp');
var spawn = require('child_process').spawn;
var paths = require('./paths');

module.exports = function() {
    var cmd = spawn('node', [
        paths.bower + 'dojo/dojo.js',
        'load=build',
        '--profile',
        'build.profile.js',
        '--releaseDir',
        '../' + paths.build
    ], {stdio: 'inherit'});

    return cmd.on('close', function (code) {
        console.log('Dojo build completed ' + (code === 0 ? 'successfully!' : 'with issues.'));
    });
};