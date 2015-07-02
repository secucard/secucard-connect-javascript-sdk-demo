var Hapi = require('hapi');
var routes = require('./routes');
var Path = require('path');

// create the server
var server = new Hapi.Server();
server.connection({ port : 9000 })

server.route(routes);

server.register({register: require('./secucard-api')}, function (err) {
    if (err) {
        console.error('Failed to load Plugin.secucard_api:', err);
    }
    else {
      server.start(function() {
        console.log('Running on 9000');
      });
    }
});

