import $ from 'jquery'
import {Net} from 'app/net'
import {Urls} from 'app/urls'
import {ActionView} from 'app/action-view'
import {Util} from 'app/util'

var initEvents = function() {
  var self = this
  
  var commands = self.events.commands
  
  commands.setHandler("getClientCredentials", () => {
    Net.get(Urls.authToken).done( (response) => {
      if (response.error) {
        self.events.vent.trigger("action:error:get:client:credentials", response)
      }  else {
        self.events.vent.trigger("action:got:client:credentials", response)
      }
    })
  })
  
  self.events.reqres.setHandler("stomp-call-type", function(){
    return $('#stomp-call-type').val();
  })

  self.events.vent.on("action:start", function(done){
    self.view.showGetCredentialsView()
    done()
  })
  
  self.events.vent.on("results:done:get:client:credentials", function(){
    Util.disable($('#client-credentials .main button'))
    $('#client-credentials .action').fadeIn()
  })
  
  commands.setHandler("showMakeStompCall", () => {
    self.view.showMakeStompCallView()
    self.events.vent.trigger("results:show:make:stomp:call:view")
  })
}

export class Action {
  constructor(events) {
    this.events = events
    this.view = new ActionView({el:"#action-view", events:events})
    initEvents.call(this)
  }
}