var path = require('path');

var appRoot = 'src/';
var outputRoot = 'dist/';
var local_packages = 'local_packages/'

module.exports = {
  root: appRoot,
  index:'index.html',
  source: appRoot + '**/*.js',
  html: appRoot + '**/*.html',
  style: 'styles/**/*.css',
  output: outputRoot,
  secucard_sdk: local_packages + "javascript_sdk/",
  sourceMapRelativePath: '../' + appRoot,
};
