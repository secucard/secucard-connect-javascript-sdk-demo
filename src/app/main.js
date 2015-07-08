import $ from 'jquery'
import {SecucardConnectBrowser} from 'javascript-sdk/browser';
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
export class Application {
  constructor() {
    this.browserSdk = new SecucardConnectBrowser(Config)
  }
  init() {
    this.events = new Events()
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

