var SecucardConnect = secucardConnect.SecucardConnect;
var SecucardServices = secucardConnect.Services;

var config = {
	restUrl: 'https://connect-dev10.secupay-ag.de/api/v2/',
	oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
	stompHost: 'connect-dev10.secupay-ag.de',
	stompEnabled: true
};

var client = SecucardConnect.create(config);
var smartTransactions = client.getService(SecucardServices.Smart.Transactions);

var demo = {
	
	init: function() {
		
		this.$accessTokenInput = $('#accessToken');
		this.$transactionJsonInput = $('#transactionJson');
		this.$transactionIdInput = $('#transactionId');
		this.$transactionTypeSelect = $('#transactionType');
		
		var $connectEl = $('#connect');
		
		console.log(this.$transactionTypeSelect);
		
		this.$connectAction = $connectEl.find('.action');
		this.$connectResult = $connectEl.find('.result');
		this.$connectError = $connectEl.find('.error');
		
		$connectEl.find('.action-start').click((function () {
			this.$connectError.hide();
			this.setTokenAndOpen(this.$accessTokenInput.val());
		}).bind(this));
		
		/*
		$connectEl.find('.action-finish').click((function () {
			this.close();
		}).bind(this));
		*/
		
		this.$transactionCreateEl = $('#transactionCreate');
		this.$transactionCreateAction = this.$transactionCreateEl.find('.action');
		
		this.$transactionCreateEl.find('.action-start').click((function () {
			this.createTransaction(this.$transactionJsonInput.val());
		}).bind(this));
		
		this.$transactionCreateResult = this.$transactionCreateEl.find('.results-view .panel-body');
		
		this.$transactionEl = $('#transaction');
		this.$transactionAction = this.$transactionEl.find('.action');
		
		this.$transactionEl.find('.action-start').click((function () {
			this.startTransaction(this.$transactionIdInput.val(), this.$transactionTypeSelect.val());
		}).bind(this));
		
		this.$transactionResult = this.$transactionEl.find('.results-view .panel-body');
		this.$transactionEvents = this.$transactionEl.find('.events-view .panel-body');
		
		smartTransactions.on('display', (function (data) {
			
			console.log('Display event', data);
			this.$transactionEvents.empty();
			this.$transactionEvents.append('<span class="text-success">' + JSON.stringify(data) +'</span>');
			
		}).bind(this));
		
	},
	
	onOpened: function () {
		console.log('Demo connected');
		this.$connectResult.show();
		this.$connectAction.hide();
		
		this.showCreateTransactionAction();
		this.showTransactionAction();
	},

	onConnectionError: function (err) {
		
		console.log('Demo connection error', err);
		this.$connectError.empty();
		this.$connectError.append('<span class="text-danger">Token is not valid</span>');
		this.$connectError.show();
		
	},

	setTokenAndOpen: function (token) {

		var credentials = {
			token: {
				access_token: token,
				expires_in: 1200,
				token_type: 'bearer',
				scope: 'https://scope.secucard.com/e/api'
			}
		};

		client.setCredentials(credentials);
		return client.open().then(this.onOpened.bind(this)).catch(this.onConnectionError.bind(this));

	},
	
	/*
	onClosed: function () {
		
	},
	
	close: function () {
		client.close().then(this.onClosed.bind(this));
	}
	*/
	
	showTransactionAction: function () {
		
		this.$transactionEl.show();
		this.$transactionAction.show();
		
	},
	
	showCreateTransactionAction: function () {
		
		this.$transactionCreateEl.show();
		this.$transactionCreateAction.show();
		
	},
	
	hideTransactionAction: function () {
		
	},
	
	onCreateTransaction: function (res) {
		console.log(res);
		this.$transactionResult.empty();
		this.$transactionCreateResult.append('<span class="text-success">' + res.id +'</span>');
	},
	
	onCreateTransactionError: function (err) {
		console.log();
		this.$transactionCreateResult.empty();
		this.$transactionCreateResult.append('<span class="text-danger">'+ 'Error: ' + err.error +'</span>');
	},
	
	createTransaction: function (jsonStr) {
		
		try {
			var jsonData = JSON.parse(jsonStr);
			console.log(jsonData);
			
			smartTransactions.create(jsonData)
				.then(this.onCreateTransaction.bind(this))
				.catch(this.onCreateTransactionError.bind(this));
			
		} catch (e) {
			
		}
		
	},
	
	onStartTransaction: function (res) {
		console.log('Transaction started', res);
		this.$transactionResult.empty();
		this.$transactionResult.append('<span class="text-success">' + JSON.stringify(res) +'</span>');
	},
	
	onStartTransactionError: function (err) {
		console.log('Start transaction error', err);
		this.$transactionResult.empty();
		this.$transactionResult.append('<span class="text-danger">'+ 'Error: ' + err.error +'</span>');
	},
	
	startTransaction: function (transactionId, type) {
		smartTransactions.start(transactionId, type)
			.then(this.onStartTransaction.bind(this))
			.catch(this.onStartTransactionError.bind(this));
	}

};

demo.init();
console.log('Demo started');

/*

 var app = client.addAppService(SecuofficeMixin);
 app.authenticate('developer@secucard.de', '').then(function (result) {

 if(result.error) {
 return Promise.resolve(result.error);
 }

 var credentials = {
 token: {
 access_token: result.token,
 expires_in: 1200,
 token_type: 'bearer',
 scope: 'https://scope.secucard.com/e/api'
 }
 };

 client.setCredentials(credentials);

 var accounts = client.getService(secucardConnect.Services.General.Accounts);
 return accounts.retrieve("me");

 }).then(function (res) {

 console.log(res);

 });
 */
