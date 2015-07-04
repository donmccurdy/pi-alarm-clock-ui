var _ = require('lodash'),
	Alarms = require('./alarms'),
	alarms = new Alarms()
;

_.merge(module.exports, {

	list: function *() {
		this.body = alarms.list();
	},

	put: function *() {
		var alarm = yield* this.request.json();
		alarms.create(alarm);
		this.body = 'PUT /alarms';
	},

	del: function *() {
		this.body = 'DELETE /alarms';
	}
});
