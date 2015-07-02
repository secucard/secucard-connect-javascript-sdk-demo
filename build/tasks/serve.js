var gulp = require('gulp');
var browserSync = require('browser-sync');

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', ['build'], function(done) {
  browserSync({
    proxy: 'localhost:' + 9000,
    files:['server/public/**/*.{js,css}']
    }, 
    done);
});
