export class Uuid {
  constructor(realm) {
    this.realm = realm
  }
  uuid() {
    return `${this.realm}#${Symbol(this.realm).toString()}`
  }
}