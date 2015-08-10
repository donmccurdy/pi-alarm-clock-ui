(function (_, fetch) {

	var HEADERS = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		TEMPLATE = ''
			+ '{{ _.each(alarms, function (alarm) { }}'
			+	'<li class="alarm" data-id="{{= alarm.id }}">'
			+		'<span class="alarm-label">'
			+			'{{- alarm.hours }}:{{- alarm.minutes }}'
			+			'{{- alarm.days }}'
			+		'</span>'
			+		'<button data-action="remove">Remove</button>'
			+	'</li>'
			+ '{{ }) }}'
	;

	/* AlarmsView
	*****************************************/
	var AlarmsView = function (element, routes) {
		this.alarms = [];
		this.routes = routes;
		this.element = element;
		this.template = _.template(TEMPLATE);
		this.bindAll();
		this.refresh();
	};

	AlarmsView.prototype.render = function () {
		var alarmsList = this.element.querySelector('[data-view=alarms]');
		alarmsList.innerHTML = this.template({alarms: this.alarms});
	};

	AlarmsView.prototype.status = function () {
		return 'ready';
	};

	AlarmsView.prototype.refresh = function () {
		return fetch(this.routes.GET)
			.then(function (response) { return response.json();  })
			.then(function (alarms) {
				this.alarms = alarms;
				this.render();
			}.bind(this));
	};

	AlarmsView.prototype.create = function () {
		var input = this.element.querySelector('[data-source=time]'),
			time = input.value.split(':'),
			alarm = {
				hours: time[0],
				minutes: time[1],
				days: [0,1,2,3,4,5,6]
			};

		return fetch(this.routes.PUT, {
				method: 'PUT',
				headers: HEADERS,
				body: JSON.stringify(alarm)
			})
			.then(this.refresh.bind(this));
	};

	AlarmsView.prototype.remove = function (id) {
		return fetch(this.routes.DELETE, {
				method: 'DELETE',
				headers: HEADERS,
				body: JSON.stringify({id: id})
			})
			.then(this.refresh.bind(this));
	};

	AlarmsView.prototype.bindAll = function () {
		this.element.addEventListener('click', function (e) {
			var action = e.target.getAttribute('data-action');
			if (action === 'create') {
				this.create();
			} else if (action === 'remove') {
				var id = e.target.parentElement.getAttribute('data-id');
				this.remove(id);
			} else if (action) {
				throw new Error('Unknown bound action: ' + action);
			}
		}.bind(this));
	};

	/* Exports
	*****************************************/
	window.AlarmsView = AlarmsView;

}(_, window.fetch));