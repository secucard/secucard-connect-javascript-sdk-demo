var path = require('path');

var appRoot = 'src/';
var outputRoot = 'dist/';
var nodeServer = outputRoot + "server/"
module.exports = {
  root: appRoot,
  bundle:"bundle/build.js",
  node: {
    server: {
    src:appRoot + "server/**/*.js",
    outputRoot: nodeServer
    }
  },
  assets:'assets/**/*',
  outputPublic:nodeServer + "public/",
  output: outputRoot,
  source:appRoot + "**/*.js",
  main: appRoot + 'app/main',
  html: appRoot + 'app/**/*.html',
  style: 'styles/**/*.css'
};
