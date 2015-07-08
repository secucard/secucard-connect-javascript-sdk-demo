var SecureCardConfig = JSON.parse(process.env.SECUCARD_CONFIG)
var SecucardConnect = require('secucard-javascript-sdk').SecucardConnect
var secucardConnect = new SecucardConnect({auth:SecureCardConfig.auth})

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
    //supports promises yay!
    handler: function(request, reply) {
      var response = reply().hold()
      var sendResponse = function(data) {
        response.source = data
        response.send()
      }
      success = function(token) {
        sendResponse({ 'authToken' : token.access_token });
      }
      error = function(response) {
        sendResponse({ error: true, status:response.status, message:response.text});
      }
      secucardConnect.auth.getClientCredentials().then(success, error)
    }
}
]