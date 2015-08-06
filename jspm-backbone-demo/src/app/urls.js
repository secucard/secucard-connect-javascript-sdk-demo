var API_ROOT =  "/api/"
var api = (path) => {
  return API_ROOT + path
}
export class Urls {
    static authToken = api("authToken")
    static uuid = api("uuid")
}