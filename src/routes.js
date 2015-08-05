var _ = require('lodash'),
	Alarms = require('./alarms'),
	alarms = new Alarms(process.env.DATABASE)
;

_.merge(module.exports, {

	list: function *() {
		try {
			this.body = yield alarms.list();
		} catch (e) {
			this.body = e;
			this.status = 500;
		}
	},

	put: function *() {
		try {
			var alarm = yield this.request.json();
			if (alarm.id) {
				this.body = yield alarms.update(alarm);
			} else {
				this.body = yield alarms.create(alarm);
			}
		} catch (e) {
			this.body = e;
			this.status = 500;
		}
	},

	del: function *() {
		try {
			var options = yield this.request.json();
			this.body = yield alarms.remove(options.id);
		} catch (e) {
			this.body = e;
			this.status = 500;
		}
	}
});
