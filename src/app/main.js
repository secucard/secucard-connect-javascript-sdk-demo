import $ from 'jquery'
import {Action} from 'app/action'
import {Result} from 'app/result'
import {Events} from 'app/events'
import {Config} from 'app/config'

var onStartDemo = function() {
  $('#start-demo').click(function(){
    $(this).fadeOut()
    $('#demo').fadeIn()
   })
}
var wireUpAjaxLoader = function() {
  $(document)
  .ajaxStart(function(){
      $("#ajax-spinner-modal").modal('show');
  })
  .ajaxStop(function(){
      $("#ajax-spinner-modal").modal('hide');
  });
}

var initEvents = function() {
  var self = this
  self.events.vent.on("done:get:client:credentials", function(){
    self.events.commands.execute("showMakeStompCall")
  })
}
export class Application {
  init() {
    this.events = new Events()
    initEvents.call(this)
    new Action(this.events)
    new Result(this.events)
  }
}

$(() => {
   var app = new Application();
   app.init()
   wireUpAjaxLoader()
   onStartDemo()
});

