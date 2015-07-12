//var SecureCardConfig = JSON.parse(process.env.SECUCARD_CONFIG);
var credentials = require('./dev-credentials.json');

var SecucardClient = require('secucard-connect').SecucardConnect.create();
SecucardClient.setCredentials(credentials);

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
				sendResponse({'authToken': token.access_token});
			};
			error = function (response) {
				sendResponse({
					error: true,
					resource: response.request.url,
					status: response.res.statusCode,
					message: response.error.toString().split(':')[1]
				});
			};
			
			SecucardClient.connect().then(success, error);
			
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