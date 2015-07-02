var SecucardConnect = require('secucard-javascript-sdk').SecucardConnect

var secucardConnect = new SecucardConnect()

var routes = {}
exports.register = function (server, options, next) {
    server.route(routes);
    next();
};

exports.register.attributes = {
  name: 'secucard-api',
    version: '0.1.0'
};

routes = [
{ 
    method: 'GET',
    path: '/api/authToken',
    handler: function(request, reply) {
      success = function(token) {
        reply({ 'authToken' : token });
      }
      error = function(msg) {
        reply({ error: true, details:msg});
      }
      secucardConnect.auth.getToken().then(success, error)
    }
}
]