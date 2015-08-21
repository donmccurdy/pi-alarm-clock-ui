var _ = require('lodash'),
	sqlite3 = require('sqlite3');

var SQL_INSERT = ''
	+ 'INSERT INTO alarms (hours, minutes, days) '
	+ 'VALUES ($hours, $minutes, $days)',
	SQL_SELECT = 'SELECT * FROM alarms',
	SQL_SELECT_ONE = 'SELECT * FROM alarms WHERE id = $id',
	SQL_DELETE = 'DELETE FROM alarms WHERE id = $id'
;


var Alarms = function (file) {
	this.db = new sqlite3.Database(file, sqlite3.OPEN_READWRITE);
};

_.merge(Alarms.prototype, {

	/**
	 * Yields a list of the user's alarms.
	 *
	 * @yield {array<Alarm>}
	 */
	list: function *() {
		return new Promise(function (resolve, reject) {
			this.db.all(SQL_SELECT, function (error, rows) {
				if (error) {
					reject({message: 'Could not retrieve alarms.'});
				} else {
					resolve(rows);
				}
			});
		}.bind(this));
	},

	/**
	 * Create a new alarm. Yields the created alarm, if successful.
	 *
	 * @param {Alarm} alarm
	 * @yield {Alarm}
	 */
	create: function *(alarm) {
		this.validate(alarm);
		var self = this;
		return new Promise(function (resolve, reject) {
			self.db.serialize(function () {
				var id = 0;
				self.db.run(SQL_INSERT, {
						$hours: alarm.hours,
						$minutes: alarm.minutes,
						$days: JSON.stringify(alarm.days)
					}, function (error) {
						if (error) {
							reject({message: 'Could not create alarm.'});
						} else {
							id = this.lastID;
						}
					}
				);

				self.db.get(SQL_SELECT_ONE, {$id: id},
					function (error, alarm) {
						if (error) {
							reject({message: 'Could not retrieve new alarm.'});
						} else {
							resolve(alarm);
						}
					}
				);
			});
		});
	},

	/**
	 * Apply updates to specified alarm. Yields the alarm, if successful.
	 *
	 * @param  {Alarm} alarm
	 * @yield {Alarm}
	 */
	update: function *(alarm) {
		this.validate(alarm);
		return new Promise(function (resolve, reject) {
			reject({message: 'Not implemented.'});
		}.bind(this));
	},

	/**
	 * Remove the specified alarm.
	 *
	 * @param {int} id
	 * @yield {boolean}
	 */
	remove: function *(id) {
		return new Promise(function (resolve, reject) {
			this.db.run(SQL_DELETE, {$id: id}, function (error) {
				if (error) {
					reject({message: 'Alarm could not be deleted.'});
				} else {
					resolve(true);
				}
			});
		}.bind(this));
	},

	validate: function (alarm) {
		if (!_.isNumber(alarm.hours)) {
			throw {message: 'Integer hours required.'};
		} else if (!_.isNumber(alarm.minutes)) {
			throw {message: 'Integer minutes required.'};
		} else if (!_.isArray(alarm.days) || !_.all(alarm.days, _.isNumber)) {
			throw {message: 'List of integer days required'};
		}
	},

	/**
	 * Closes DB connections in preparation for the destruction of the object.
	 */
	destroy: function () {
		this.db.close();
	}
});

module.exports = Alarms;
