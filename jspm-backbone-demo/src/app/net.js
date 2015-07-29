import $ from 'jquery'

export class Net {
  static get(url) {
    return $.getJSON(url)
  }
}