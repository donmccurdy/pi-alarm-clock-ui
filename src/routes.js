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

	find: function *() {
		try {
			this.body = yield alarms.find(this.params.id);
		} catch (e) {
			this.body = e;
			this.status = 500;
		}
	},

	post: function *() {
		try {
			var alarm = yield this.request.json();
			if (this.params.id) {
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
			this.body = yield alarms.remove(this.params.id);
		} catch (e) {
			this.body = e;
			this.status = 500;
		}
	}
});
