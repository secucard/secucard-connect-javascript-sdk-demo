import $ from 'jquery';
import {Action} from './action';
import {Result} from './result';
import {Events} from './events';
//import {Config} from './config';
import {SecucardConnect, Services} from 'secucard-connect';
import {Uuid} from './uuid';
import {Net} from './net';
import {Urls} from './urls';


var onStartDemo = function () {
	var self = this;
	$('#start-demo').click(function () {
		$(this).fadeOut()
		self.events.vent.trigger('action:start', function () {
			$('#demo').fadeIn()
		})
	})
};
var wireUpAjaxLoader = () => {
	$(document)
		.ajaxStart(() => {
			$("#ajax-spinner-modal").modal('show');
		})
		.ajaxStop(() => {
			$("#ajax-spinner-modal").modal('hide');
		});
};

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
		
		this.client = SecucardConnect.create();
		
	}
	
	initEvents() {

		this.events.vent.on("results:done:get:client:credentials", (token) => {
			this.updateClientToken(token);
		});
		
		this.events.vent.on("results:show:make:stomp:call:view", (token) => {
			this.client.open().then(()=>{
				console.log('opened');
				$('#btn-make-stomp-call').prop('disabled', false);
			}).catch((err)=>{
				console.log(err.message);
			});
		});
		
		this.events.commands.setHandler("makeStompCall", () => {
			
			let skeletons = this.client.getService(Services.General.Skeletons);
			skeletons.retrieveList().then((res) => {
				console.log(res);
				this.events.vent.trigger('results:update:stomp:call:view', 'message', JSON.stringify(res));
			}).catch((err) => {
				console.log(err);
				this.events.vent.trigger('results:update:stomp:call:view', 'error', JSON.stringify(err));
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
		app.uuidGen = new Uuid(response.uuid);
		wireUpAjaxLoader();
		onStartDemo.call(app)
	})
});

