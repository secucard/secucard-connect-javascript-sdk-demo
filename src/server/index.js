var Hapi = require('hapi');
var routes = require('./routes');
var Path = require('path');

// create the server
var server = new Hapi.Server();
server.connection({ port : 9000 })

server.route(routes);

server.start(function() {
  console.log('Running on 9000');
});