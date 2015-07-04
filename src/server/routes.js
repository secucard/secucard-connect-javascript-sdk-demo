var directoryHander = {
      directory: {
        path: __dirname + '/public',
        listing:true
      }
 }     
module.exports = [
   { 
    method: 'GET',
    path: '/{asset*3}',
    handler: directoryHander
  },
   { 
    method: 'GET',
    path: '/{param*}',
    handler: directoryHander
  }
]