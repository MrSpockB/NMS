process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./server/config/config'),
	mongoose = require('./server/config/mongoose'),
	express = require('./server/config/express');

var db = mongoose(),
	app = express();

app.listen(config.port);

console.log(process.env.NODE_ENV  + ' server running at http://localhost:' + config.port);