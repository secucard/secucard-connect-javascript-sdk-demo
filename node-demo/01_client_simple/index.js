var SecucardConnect = require('secucard-connect').SecucardConnect;
var Services = require('secucard-connect').Services;

// set credentials
var credentials = {
  'client_id': 'YOUR_CLIENT_ID',
  'client_secret': 'YOUR_CLIENT_SECRET'
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
  }
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

server.route({
  method: 'GET',
  path: '/create_customer',
  handler: function(request, reply) {
    var customers = client.getService(Services.Payment.Customers);

    var data = {
      contact : {
        name: 'Max Müster',
        forename: 'Max',
        surname: 'Müster',
        email: 'max@example.com',
        dob: '1985-01-12',
        address: {
          street: 'Lange-Straße',
          street_number: '123b',
          postal_code: '01234',
          city: 'Münster',
          country : 'DE'
        },
        phone: '0158743243787'
      }
    };

    customers.create(data).then(function(res){
      reply(res);
    }).catch(function(err){
      console.log(err);
    });
  }
});

server.route({
  method: 'GET',
  path: '/create_prepay_payment',
  handler: function(request, reply) {
    var custumerId = 'PCU_CP45TYJ232MASNBD875XUE5FNM8UA6';
    var prepays = client.getService(Services.Payment.SecupayPrepays);

    var data = {
      customer: custumerId,
      amount: 100,
      currency: 'EUR',
      purpose: 'Test order'
    };

    prepays.create(data).then(function(res){
      reply(res);
    }).catch(function(err){
      console.log(err);
    });
  }
});

server.start(function() {
  console.log('Running on 9000');
});