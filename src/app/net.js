import $ from 'jquery'

export class Net {

  static get(url, done) {
    $.getJSON(url, done)
  }
}