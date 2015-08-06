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

export {BaseView, SubView}