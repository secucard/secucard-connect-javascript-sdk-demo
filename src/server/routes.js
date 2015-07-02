module.exports = [
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