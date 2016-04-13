var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var paths = require('../paths');
 var shell = require('gulp-shell');
 var rename = require('gulp-rename')
var nodemon = require('gulp-nodemon');
var env = require('gulp-env');
var secucardConfig = require('../../conf/secucard.json');

gulp.task('set-env', function () {
    env({
       vars:{SECUCARD_CONFIG:JSON.stringify(secucardConfig)}
    });
});

gulp.task('build-system', shell.task([
  'jspm bundle-sfx ' + paths.main + ' ' + paths.bundle,
  'gulp copy-bundle'
]));

gulp.task('copy-bundle', function () {
  return gulp.src(paths.bundle)
    .pipe(rename("bundle.js"))
    .pipe(gulp.dest(paths.outputPublic));
});
gulp.task('copy-styles', function () {
  return gulp.src(paths.style)
    .pipe(rename("app.css"))
    .pipe(gulp.dest(paths.outputPublic));
});


gulp.task('copy-assets', function () {
  return gulp.src([paths.assets])
    .pipe(gulp.dest(paths.outputPublic + "/assets/"));
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
    'set-env',
    'clean',
    ['build-system', 'build-html'],
    'build-node-server',
    'copy-styles',
    'copy-assets',
    'clean-after-build',
    callback
  );
});

gulp.task('node-serve', function() {
  nodemon({ script : paths.node.server.outputRoot + 'index.js', ext : 'js' });
});
