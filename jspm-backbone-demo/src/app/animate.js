import $ from 'jquery'
var animation_events = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend"
export class Animate {
  constructor(el) {
    this.$el = $(el)
  }
  animate(target, type) {
    var klass = type + ' animated'
     this.$el.addClass(klass).one(animation_events, function(){
      $(this).removeClass(klass);
    });
  }
}