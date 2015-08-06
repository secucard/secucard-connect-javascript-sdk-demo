export class Uuid {
  constructor(realm) {
    this.realm = realm
    this.iterator = (function (){
        var index = 0
        return {
          next:function() {
             return {value: ++index, done: false};
          }
        }
     })() 
  }
  uuid() {
    return `${this.realm}#${this.iterator.next().value}`
  }
}