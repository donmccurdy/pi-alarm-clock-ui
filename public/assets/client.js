(function () {

	var SELECTOR = '.alarms',
		ROUTES = {
			GET: '/examples/alarms.json',
			POST: null,
			DELETE: null,
			UPDATE: null
		};

	/* AlarmsView
	*****************************************/

	var AlarmsView = function (alarms) {
		this.alarms = alarms;
		this.element = document.querySelector(SELECTOR);
		this.render();
	};

	AlarmsView.prototype.render = function () {
		this.element.innerText = JSON.stringify(this.alarms, null, 2);
	};

	AlarmsView.prototype.status = function () {
		return 'ready';
	};

	/* Bootstrap
	*****************************************/

	window.fetch(ROUTES.GET)
		.then(function (response) { return response.json(); })
		.then(function (alarms) { return new AlarmsView(alarms); })
		.then(function (view) {
			console.log('Alarms View Status: ' + view.status().toUpperCase());
		});

}());