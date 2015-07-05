(function (_, fetch) {

	var SELECTOR = '.alarms',
		HEADERS = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		TEMPLATE = _.template(''
			+ '{{ _.each(alarms, function (alarm) { }}'
			+	'<li class="alarm" data-id="{{= alarm.id }}">'
			+		'<span class="alarm-label">{{- alarm.time }}</span>'
			+		'<span class="alarm-remove">&times;</span>'
			+	'</li>'
			+ '{{ }) }}'
		)
	;

	/* TODO - temporary
	*****************************************/
	var input = document.querySelector('input.time'),
		button = document.querySelector('.switch');

	/* AlarmsView
	*****************************************/
	var AlarmsView = function (alarms, routes) {
		this.alarms = alarms;
		this.routes = routes;
		this.element = document.querySelector(SELECTOR);
		this.bindAll();
		this.render();
	};

	AlarmsView.prototype.render = function () {
		this.element.innerHTML = TEMPLATE({alarms: this.alarms});
	};

	AlarmsView.prototype.status = function () {
		return 'ready';
	};

	AlarmsView.prototype.create = function () {
		var self = this,
			alarm = {time: input.value};

		fetch(self.routes.PUT, {
				method: 'PUT',
				headers: HEADERS,
				body: JSON.stringify(alarm)
			})
			.then(function () { return fetch(self.routes.GET); })
			.then(function (response) { return response.json();  })
			.then(function (alarms) {
				self.alarms = alarms;
				self.render();
			});
	};

	AlarmsView.prototype.bindAll = function () {
		button.addEventListener('click', this.create.bind(this));
	};

	/* Exports
	*****************************************/
	_.merge(window, {AlarmsView: AlarmsView});

}(_, window.fetch));