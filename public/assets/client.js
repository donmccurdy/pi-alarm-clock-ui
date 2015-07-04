(function (fetch) {

	var SELECTOR = '.alarms',
		HEADERS = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		ROUTES = {
			GET: '/alarms',
			PUT: '/alarms',
			DELETE: '/alarms',
			UPDATE: '/alarms'
		};

	// TODO temporarily globals
	var input = document.querySelector('input.time'),
		button = document.querySelector('.switch');

	/* AlarmsView
	*****************************************/

	var AlarmsView = function (alarms) {
		this.alarms = alarms;
		this.element = document.querySelector(SELECTOR);
		this.bindAll();
		this.render();
	};

	AlarmsView.prototype.render = function () {
		this.element.innerText = JSON.stringify(this.alarms, null, 2);
	};

	AlarmsView.prototype.status = function () {
		return 'ready';
	};

	AlarmsView.prototype.create = function () {
		var self = this,
			alarm = {time: input.value};

		fetch(ROUTES.PUT, {
				method: 'PUT',
				headers: HEADERS,
				body: JSON.stringify(alarm)
			})
			.then(function () { return fetch(ROUTES.GET); })
			.then(function (response) { return response.json();  })
			.then(function (alarms) {
				self.alarms = alarms;
				self.render();
			});
	};

	AlarmsView.prototype.bindAll = function () {
		button.addEventListener('click', this.create.bind(this));
	};

	/* Bootstrap
	*****************************************/

	fetch(ROUTES.GET)
		.then(function (response) { return response.json(); })
		.then(function (alarms) { return new AlarmsView(alarms); });

}(window.fetch));
