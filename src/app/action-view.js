import {BaseView, SubView} from 'app/view'
import s from 'underscore.string'
import {Util} from 'app/util'

var wireUpActions = function() {
  var self = this
  var events = self.events
  self.$el.find('.action').click( (event) => {
    var target = event.currentTarget
    var _action = action($(target).data('action'))
    if (_action) {
      events.commands.execute(_action)
    }
  })
}

var action = (name) => {
  if (name) {
    return s(name).camelize().value()
  }
}

class MakeStompCallView extends SubView {
   initialize () {
      this.template = $('#action-make-stomp-call-view').html()
   }
}

class GetCredentialsView extends SubView {
   initialize (options) {
    this.template = $('#action-get-credentials-view').html()
  }
}

var afterRender = function() {
  wireUpActions.call(this)
}

export class ActionView extends BaseView {
    initialize (options) {
        this.events = options.events
        this.model = {screen:""}
        this.template = "<%= screen %>"
    }
    showGetCredentialsView() {
      var getCredentialsView = new GetCredentialsView()
      this.model.screen = getCredentialsView.view()
      this.render()
      afterRender.call(this)
    }
    showMakeStompCallView() {
      var makeStompCallView = new MakeStompCallView()
      this.model.screen = makeStompCallView.view()
      this.render()
      $('#stomp-call-type').click(function(){
        var val = $(this).val()
        if (val) {
          Util.enable($('#btn-make-stomp-call'))
        }else {
          Util.disable($('#btn-make-stomp-call'))
        }
      })
      afterRender.call(this)
    }
}