var config = require('./config'),
	express = require('express'),
	bodyParser = require('body-parser');
module.exports = function()
{
	var app = express();
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(function(req, res, next)
	{
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
		res.setHeader('Access-Control-Allow-Headers', 'X-Request-With,content-type, Authorization');
		next();
	});
	require('../routes/users')(app);
<<<<<<< HEAD
	require('../routes/auth')(app);
=======
	require('../routes/proyects')(app);
	require('../routes/services')(app);
>>>>>>> origin/master
	return app;
};