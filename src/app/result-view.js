import Backbone from 'backbone'
import _ from 'underscore'

class BaseView extends Backbone.View {
  render () {
        this.$el.html(_.template(this.template)(this.model));
        return this;
    }

}
class SubView extends Backbone.View {
   view () {
      return _.template(this.template)(this.model);
    }
}

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

export class ResultView extends BaseView {
    initialize () {
        this.model = {screen:""}
        this.template = "<%= screen %>"
    }
    showAccessToken(token) {
      var accessTokenView = new AccessTokenView({model:{token:token}})
      this.model.screen = accessTokenView.view()
      this.render()
    }
}