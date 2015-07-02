var path = require('path');

var appRoot = 'src/';
var outputRoot = 'dist/';
var nodeServer = outputRoot + "server/"
module.exports = {
  root: appRoot,
  bundle:"build.js",
  node: {
    server: {
    src:appRoot + "server/**/*.js",
    outputRoot: nodeServer
    }
  },
  outputPublic:nodeServer + "public/",
  output: outputRoot,
  main: appRoot + 'app/main',
  html: appRoot + 'app/**/*.html',
  style: 'styles/**/*.css',
};
