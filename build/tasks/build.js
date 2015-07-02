var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var paths = require('../paths');
 var shell = require('gulp-shell');
 var rename = require('gulp-rename')
var nodemon = require('gulp-nodemon');

gulp.task('build-system', shell.task([
  'jspm bundle-sfx ' + paths.main,
  'gulp copy-bundle'
]))

gulp.task('copy-bundle', function () {
  return gulp.src(paths.bundle)
    .pipe(rename("app.js"))
    .pipe(gulp.dest(paths.outputPublic));
});

// copies changed html files to the output directory
gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe(changed(paths.outputPublic, {extension: '.html'}))
    .pipe(gulp.dest(paths.outputPublic));
});


// copies changed html files to the output directory
gulp.task('build-node-server', function () {
  return gulp.src(paths.node.server.src)
    .pipe(gulp.dest(paths.node.server.outputRoot));
});



// copies changed html files to the output directory
gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe(changed(paths.outputPublic, {extension: '.html'}))
    .pipe(gulp.dest(paths.outputPublic));
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-system', 'build-html', 'build-node-server'],
    'clean-after-build',
    callback
  );
});

gulp.task('node-serve', function() {
  nodemon({ script : paths.node.server.outputRoot + 'index.js', ext : 'js' });
});
