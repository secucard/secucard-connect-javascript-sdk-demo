import $ from 'jquery';
import {Action} from './action';
import {Result} from './result';
import {Events} from './events';
//import {Config} from './config';
import {SecucardConnect} from 'secucard-connect';
import {Uuid} from './uuid';
import {Net} from './net';
import {Urls} from './urls';

console.log(SecucardConnect);


var onStartDemo = function () {
	var self = this
	$('#start-demo').click(function () {
		$(this).fadeOut()
		self.events.vent.trigger('action:start', function () {
			$('#demo').fadeIn()
		})
	})
}
var wireUpAjaxLoader = () => {
	$(document)
		.ajaxStart(() => {
			$("#ajax-spinner-modal").modal('show');
		})
		.ajaxStop(() => {
			$("#ajax-spinner-modal").modal('hide');
		});
}
var configFor = (request) => {
	return Config.stomp.requests[request]
}
var initEvents = function () {
	var self = this;
	
	self.events.commands.setHandler("makeStompCall", () => {
		var call = self.events.reqres.request("stomp-call-type")
		var accessToken = self.accessToken
		var stompListener = function (event, details) {
			var message = event == "error" ? details.toString() : details
			self.events.vent.trigger("results:update:stomp:call:view", event, message)
		}
		var config = configFor(call)
		var params = {
			accessToken: accessToken,
			requestId: self.uuidGen.uuid(),
			requestMethod: config.method,
			options: config.options
		}
		self.stomp
			.listener(stompListener)
			.request(params)
	})
}
export class Application {
	
	init() {
		this.events = new Events();
		this.initEvents();
		this.initSecucard();
		new Action(this.events);
		new Result(this.events);
		return Net.get(Urls.uuid);
	}
	
	initSecucard() {
		
		let config = {
			stompHost: 'connect-dev10.secupay-ag.de'
		};
		
		this.client = SecucardConnect.create(config);
		this.stomp = this.client.context.getStompChannel();
		
	}
	
	initEvents() {

		this.events.vent.on("results:done:get:client:credentials", (token) => {
			this.updateClientToken(token);
			this.stomp.open().then(()=>{
				console.log('Stomp opened');
			});
		});
		
	}
	
	updateClientToken(token) {
		this.token = token;
		this.client.setCredentials({token: token});
		console.log('AccessToken', this.token);
	}
	
}

$(() => {
	var app = new Application();
	app.init().done(function (response) {
		app.uuidGen = new Uuid(response.uuid)
		wireUpAjaxLoader()
		onStartDemo.call(app)
	})
});

