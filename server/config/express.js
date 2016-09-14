var config = require('./config'),
	express = require('express'),
	passport = require('passport'),
	switchyard = require('switchyard'),
	bodyParser = require('body-parser');
module.exports = function()
{
	var app = express();
	var apiRouter = express.Router();
	var authMiddleware = require('./../middleware/auth-check')(config);
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(passport.initialize());
	app.use(function (req, res, next) {
	  console.log(req.method, req.originalUrl);
	  next();
	});
	app.use(function(req, res, next)
	{
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Requested-With, Session, Authorization');
		next();
	});
	
	require('./../passport')(passport);
	require('../routes/auth')(app);
	//require('../routes/commands')(app);
	//apiRouter.use(authMiddleware);
	switchyard(apiRouter, __dirname+'./../controllers');
	//require('../routes/users')(apiRouter);
	//require('../routes/proyects')(apiRouter);
	//require('../routes/services')(apiRouter);
	app.use('/', apiRouter);
	return app;
};