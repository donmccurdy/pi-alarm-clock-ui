(function (_) {

	/* Lodash Configuration
	*****************************************/
	_.templateSettings = {
		evaluate:		/\{\{(.+?)\}\}/g,
		interpolate:	/\{\{=(.+?)\}\}/g,
		escape:			/\{\{-(.+?)\}\}/g
	};

}(_));
