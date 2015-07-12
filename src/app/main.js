import $ from 'jquery';
import {Action} from './action';
import {Result} from './result';
import {Events} from './events';
//import {Config} from './config';
import {SecucardConnect} from 'secucard-connect';
import {Uuid} from './uuid';
import {Net} from './net';
import {Urls} from './urls';

console.log(SecucardConnect);

var onStartDemo = function() {
  var self = this
  $('#start-demo').click(function(){
    $(this).fadeOut()
    self.events.vent.trigger('action:start', function(){
      $('#demo').fadeIn()
    })
   })
}
var wireUpAjaxLoader = () => {
  $(document)
  .ajaxStart(() => {
      $("#ajax-spinner-modal").modal('show');
  })
  .ajaxStop(() => {
      $("#ajax-spinner-modal").modal('hide');
  });
}
var configFor = (request) => {
  return Config.stomp.requests[request]
}
var initEvents = function() {
  var self = this
  self.events.vent.on("results:done:get:client:credentials", function(token){
    self.accessToken = token
    self.stomp = new SecucardConnectBrowser(Config).stomp
  })
  self.events.commands.setHandler("makeStompCall", () => {
    var call = self.events.reqres.request("stomp-call-type")
    var accessToken = self.accessToken
    var stompListener = function(event, details) {
      var message = event == "error" ? details.toString() : details
      self.events.vent.trigger("results:update:stomp:call:view", event, message)
    }
    var config = configFor(call)
    var params = {
      accessToken: accessToken,
      requestId: self.uuidGen.uuid(),
      requestMethod:config.method,
      options: config.options
    }
    self.stomp
      .listener(stompListener)
      .request(params)   
  })
}
export class Application {
  init() {
    this.events = new Events()
    //initEvents.call(this)
    new Action(this.events)
    new Result(this.events)
    return Net.get(Urls.uuid)
  }
}

$(() => {
   var app = new Application();
   app.init().done(function(response) {
    app.uuidGen = new Uuid(response.uuid)
    wireUpAjaxLoader()
    onStartDemo.call(app)
   }) 
});

