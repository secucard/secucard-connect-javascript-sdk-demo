import {ResultView} from 'app/result-view'
var initEvents = function() {
  self = this
  self.events.vent.on("action:error:get:client:credentials", function(response) {
    self.view.showError(response) 
  })  
  self.events.vent.on("action:got:client:credentials", function(token) {
    self.view.showAccessToken(token.authToken) 
    self.events.vent.trigger('results:done:get:client:credentials', token.authToken)
  })  
  self.events.vent.on("results:show:make:stomp:call:view", function(token) {
    self.view.showStompCallView() 
  })  
  self.events.vent.on("results:update:stomp:call:view", function(event, message) {
    var model = {response:"", status:{error:false, message:message}}
    if (event == "message") {
      model.response = message
    } else if(event == "error") {
      model.status.error = true
    }
    self.view.updateStompCallView(model) 
  })  
}
export class Result {
  constructor(events) {
    this.events = events
    this.view = new ResultView({el:"#results-view"})
    initEvents.call(this)
  }
}