var SecucardConnect = require('secucard-connect').SecucardConnect;
var Services = require('secucard-connect').Services;

// set credentials
var credentials = {
  'client_id': '09ae83af7c37121b2de929b211bad944',
  'client_secret': '9c5f250b69f6436cb38fd780349bc00810d8d5051d3dcf821e428f65a32724bd',
};

var config = {
  restUrl: 'https://connect-testing.secupay-ag.de/api/v2/',
  oAuthUrl: 'https://connect-testing.secupay-ag.de/oauth/',
  stompHost: 'connect-testing.secupay-ag.de',
  stompEnabled: true,
};

// create Secucard client
var client = SecucardConnect.create(config);
client.setCredentials(credentials);

// establish connection
client.open().then(function() {
  console.log('Secucard client connected');
}).catch(function(err) {
  console.log(err);
});

var Hapi = require('hapi');
// create the server
var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 9000,
});

server.route({
  method: 'GET',
  path: '/hello',
  handler: function(request, reply) {
    reply('hello world');
  },
});

server.route({
  method: 'GET',
  path: '/get_customers',
  handler: function(request, reply) {
    var customers = client.getService(Services.Payment.Customers);

    var queryParams = {
      count: 3,
      offset: 0
    };

    customers.retrieveList(queryParams).then(function(res){
      reply(res);
    }).catch(function(err){
      console.log(err);
    });
  }
});

server.start(function() {
  console.log('Running on 9000');
});