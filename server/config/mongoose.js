var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function() {
	var db = mongoose.connect(config.db);
	require('../models/user');
	require('../models/proyect');
	require('../models/service');
	return db;
}