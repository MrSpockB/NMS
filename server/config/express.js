var config = require('./config'),
	express = require('express'),
	passport = require('passport'),
	bodyParser = require('body-parser');
module.exports = function()
{
	var app = express();
	var apiRouter = express.Router();
	var authMiddleware = require('./../middleware/auth-check');
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(passport.initialize());
	app.use(function (req, res, next) {
	  console.log('Time:', Date.now());
	  next();
	});
	app.use(function(req, res, next)
	{
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
		res.setHeader('Access-Control-Allow-Headers', 'X-Request-With,content-type, Authorization');
		next();
	});
	
	require('./../passport')(passport);
	require('../routes/auth')(app);
	//apiRouter.use(authMiddleware);
	require('../routes/users')(apiRouter);
	require('../routes/proyects')(apiRouter);
	require('../routes/services')(apiRouter);
	app.use('/', apiRouter);
	return app;
};