SecureCardConfig = require('./conf/secucard.json');
var credentials1 = SecureCardConfig['dev-credentials-refresh-token1'];
var credentials2 = SecureCardConfig['dev-credentials-refresh-token2'];
var SecucardConnect = require('secucard-connect').SecucardConnect;
var Services = require('secucard-connect').Services;

var secucardClient1 = SecucardConnect.create();
secucardClient1.setCredentials(credentials1);

var secucardClient2 = SecucardConnect.create();
secucardClient2.setCredentials(credentials2);

console.log('Using secucard-connect', secucardClient1.getVersion());
var sessionCheckTime = 5*1000;

console.log(Services);

function startSessionDebug(client) {
	
	var sessions = client.getService(Services.Auth.Sessions);
	client.sessionTimer = setInterval(function () {
		
		sessions.check()
			.then(function(res) {
				console.log(res);
			})
			.catch(function(err){
				console.log(err);
			});
		
	}, sessionCheckTime);
	
}

secucardClient1.open().then(function () {
	console.log('secucard-connect 1 started');
	startSessionDebug(secucardClient1)
}).catch(function(err) {
	console.log(err);
});

secucardClient2.open().then(function () {
	console.log('secucard-connect 2 started');
	startSessionDebug(secucardClient2)
}).catch(function(err) {
	console.log(err);
});

var Hapi = require('hapi');
// create the server
var server = new Hapi.Server();

server.connection({
	host: 'localhost',
	port: 9000
});

server.route({
	method: 'GET',
	path: '/hello',
	handler: function (request, reply) {
		reply('hello world');
	}
});

server.start(function () {
	console.log('Running on 9000');
});