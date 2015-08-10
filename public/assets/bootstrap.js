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
	window.alarmsView = new AlarmsView(document.body, ROUTES);

}(window.fetch, window.AlarmsView));
