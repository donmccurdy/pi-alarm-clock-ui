var _ = require('lodash');

var Alarms = function () {};

_.merge(Alarms.prototype, {

	list: function () {
		return [];
	},

	create: function (alarm) {

	},

	update: function (id, alarm) {

	},

	remove: function (id) {

	}

});

module.exports = Alarms;
