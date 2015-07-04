var _ = require('lodash');

var Alarms = function () {
	this.alarms = [];
};

_.merge(Alarms.prototype, {

	list: function () {
		return this.alarms;
	},

	create: function (alarm) {
		this.alarms.push(alarm);
	},

	update: function (id, alarm) {
		// TODO
	},

	remove: function (id) {
		// TODO
	}

});

module.exports = Alarms;
