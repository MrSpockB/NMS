var config = require('./config'),
	express = require('express'),
	bodyParser = require('body-parser');
module.exports = function()
{
	var app = express();
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	require('../routes/users')(app);
	require('../routes/proyects')(app);
	require('../routes/services')(app);
	return app;
};