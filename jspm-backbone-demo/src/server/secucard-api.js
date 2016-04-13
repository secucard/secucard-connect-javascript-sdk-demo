var SecureCardConfig;

if (process.env.SECUCARD_CONFIG) {
  SecureCardConfig = JSON.parse(process.env.SECUCARD_CONFIG);
} else {
  SecureCardConfig = require('../../conf/secucard.json');
}

var credentials = SecureCardConfig['dev-credentials'];

function TokenStorageMixin() {

}

TokenStorageMixin.prototype.storeToken = function (token) {
  console.log('TokenStorageMixin.storeToken', JSON.stringify(token));
  this.token = JSON.stringify(token);
  return Promise.resolve(this.token);
};

TokenStorageMixin.prototype.removeToken = function () {
  console.log('TokenStorageMixin.removeToken');
  this.token = null;
  return Promise.resolve(this.token);
};

TokenStorageMixin.prototype.getStoredToken = function () {
  console.log('TokenStorageMixin.getStoredToken', this.token);
  return Promise.resolve(JSON.parse(this.token));
};

var client = require('secucard-connect').SecucardConnect.create();
client.setCredentials(credentials, TokenStorageMixin).then();
// open connection if required later 
client.open().then(function () {

  let getRawToken = true;
  client.exportToken(getRawToken).then(function (token) {
    console.log('Stored raw token', token);
  });

});

var uuid = require('node-uuid');

var routes = {};

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
    handler: function (request, reply) {


      var response = reply().hold();
      var sendResponse = function (data) {
        response.source = data;
        response.send();
      };

      success = function (token) {
        sendResponse(token);
      };
      error = function (response) {
        sendResponse({
          error: true,
          resource: response.request.url,
          status: response.res.statusCode,
          message: response.error.toString().split(':')[1]
        });
      };

      client.exportToken().then(success);
    }
  },
  {
    method: 'GET',
    //returns uuid -- time based
    path: '/api/uuid',
    handler: function (request, reply) {
      reply({uuid: uuid.v1()})
    }
  }

];
