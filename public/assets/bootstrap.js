(function (fetch, AlarmsView) {

	/* Resources
	*****************************************/
	var ROUTES = {
		GET: '/alarms',
		PUT: '/alarms',
		DELETE: '/alarms',
		UPDATE: '/alarms'
	};

	/* Lodash Configuration
	*****************************************/
	_.templateSettings = {
		evaluate:		/\{\{(.+?)\}\}/g,
		interpolate:	/\{\{=(.+?)\}\}/g,
		escape:			/\{\{-(.+?)\}\}/g
	};

	/* Bootstrap
	*****************************************/
	fetch(ROUTES.GET)
		.then(function (response) { return response.json(); })
		.then(function (alarms) { return new AlarmsView(alarms, ROUTES); });

}(window.fetch, window.AlarmsView));
