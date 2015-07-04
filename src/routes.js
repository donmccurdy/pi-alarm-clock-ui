var _ = require('lodash');

_.merge(module.exports, {

	list: function *() {
		this.body = 'GET /alarms';
	},

	put: function *() {
		this.body = 'PUT /alarms';
	},

	del: function *() {
		this.body = 'DELETE /alarms';
	}
});
