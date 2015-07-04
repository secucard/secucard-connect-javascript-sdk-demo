import {ResultView} from 'app/result-view'
var initEvents = function() {
  self = this
  self.events.vent.on("got:client:credentials", function(token) {
    self.view.showAccessToken(token.authToken) 
  })  
}
export class Result {
  constructor(events) {
    this.events = events
    this.view = new ResultView({el:"#results-view"})
    initEvents.call(this)
  }
}