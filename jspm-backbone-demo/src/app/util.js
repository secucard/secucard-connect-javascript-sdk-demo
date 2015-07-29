export class Util {
  static disable($element) {
    $element.prop("disabled", true)
  }
  static enable($element) {
    $element.prop("disabled", false)
  }
}