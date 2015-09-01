require('dotenv').load();

var koa = require('koala'),
	serve = require('koa-static'),
	routing = require('koa-routing'),
	routes = require('./routes'),
	app = koa()
;

app
	.use(serve('./public'))
	.use(serve('./bower_components'))
	.use(routing(app))
	.route('/alarms')
		.get(routes.list)
		.post(routes.post)
		.nested('/:id')
			.get(routes.find)
			.post(routes.post)
			.delete(routes.del)
;

app.listen(app.env.PORT);
