import {BaseView, SubView} from 'app/view'

class AccessTokenView extends SubView {
   initialize (options) {
      this.model = options.model
      this.template = `
        <div class='screen client-credentials'>
        <span>Access Token: <%= token %></span>
        </div>
      `
  }
}

class ErrorView extends SubView {
   initialize (options) {
      this.model = options.model
      this.template = `<div class="alert alert-danger"><p>Resource: <%= resource %></p>(<%= status %>) <%= message %></div>`
   }
}

class StompCallViewStatus extends SubView {
   initialize (options) {
      this.model = options.model
      this.template = `<% if (status.message) { %>
                   <div class="alert alert-<%= status.error ? 'danger' : 'success'%>">
                      <%= status.message %>
                   </div>
                  <% } %>` 
   }
}

class StompCallViewResponse extends SubView {
   initialize (options) {
      this.model = options.model
      this.template = `<% if (response) { %>
                   <div class="alert alert-success">
                      <%= response %>
                   </div>
                  <% } %>  `
   }
}

class StompCallViewDebug extends SubView {
   initialize (options) {
      this.model = options.model
      this.template = `<% if (debug) { %>
                  <div class="alert alert-info">
                      <%= debug %>
                   </div>
                  <% } %>  `
   }
}

class StompCallView extends SubView {
   initialize (options) {
      this.model = {response:"", status:{}}
      this.template = $('#results-stomp-view').html()
   }
}


export class ResultView extends BaseView {
    initialize () {
        this.model = {screen:""}
        this.status = 
        this.template = "<%= screen %>"
    }
    showError(response) {
      var model = {status:response.status,resource:response.resource, message:response.message}
      var errorView = new ErrorView({model:model})
      this.model.screen = errorView.view()
      this.render()
    }
    showAccessToken(token) {
      var accessTokenView = new AccessTokenView({model:{token:token}})
      this.model.screen = accessTokenView.view()
      this.render()
    }
    showStompCallView(token) {
      var stompCallView = new StompCallView()
      this.model.screen = stompCallView.view()
      this.render()
      $('#results-view .panel-body').css('height', "200px")
    }
    updateStompCallView(model) {
      var view, target, options = {el:this.el, model:model};
      if (model.response) {
        view = new StompCallViewResponse(options).view()
        target = this.$el.find('#response')
      } else if (model.debug) {
         view = new StompCallViewDebug(options).view()
        target = this.$el.find('#debug')
      }
      else {
        view = new StompCallViewStatus(options).view()
        target = this.$el.find('#status')
      }
      $(target).prepend(view).scrollTop(0)
    }
}