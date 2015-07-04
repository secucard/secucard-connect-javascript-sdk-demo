import $ from 'jquery'
import s from 'underscore.string'
import {Net} from 'app/net'
import {Urls} from 'app/urls'
console.log(Urls.authToken)
var initAction = function() {
  this.$el.find('.action').click( (event) => {
    var target = event.currentTarget
    var _action = action($(target).data('action'))
    if (_action) {
      this.events.commands.execute(_action)
    }
  })
}
var initEvents = function() {
  var self = this
  var commands = self.events.commands
  commands.setHandler("getClientCredentials", () => {
  Net.get(Urls.authToken, (credentials) => {
    self.events.vent.trigger("got:client:credentials", credentials)  
  })
 })
}
var action = (name) => {
  if (name) {
    return s(name).camelize().value()
  }
}
export class Action {
  constructor(events, el="#action") {
    this.events = events
    this.el = el
    this.$el = $(this.el)
    initAction.call(this)
    initEvents.call(this)
  }
}