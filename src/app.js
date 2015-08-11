require('dotenv').load();

var koa = require('koala'),
	serve = require('koa-static'),
	router = require('koa-route'),
	routes = require('./routes'),
	app = koa()
;

app
	.use(serve('./public'))
	.use(router.get('/alarms', routes.list))
	.use(router.put('/alarms', routes.put))
	.use(router.del('/alarms', routes.del))
;

app.listen(app.env.PORT);
