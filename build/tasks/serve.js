var gulp = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000

gulp.task('browser-sync', function(done) {
  browserSync({
    proxy: 'localhost:' + 9000,
    files:['server/public/**/*.{js,css}']
    }, 
    done);
});


gulp.task('serve', function(done) {
  return runSequence(
    'build',
    'node-serve',
    'browser-sync',
    done
    )
});
