module.exports = [
  { 
    method: 'GET',
    path: '/api',
    handler: function(request, reply) {
      reply({ 'api' : 'hello!' });
    }
  },
   { 
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: __dirname + '/public',
        listing:true
      }
    }
  }
]