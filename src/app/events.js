import Wreqr from 'backbone.wreqr'

export class Events {
  constructor() {
    this.vent = new Wreqr.EventAggregator();
    this.commands = new Wreqr.Commands();
    this.reqres = new Wreqr.RequestResponse();
  }
} 