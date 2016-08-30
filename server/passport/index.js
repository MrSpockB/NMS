var config = require('../config/config');

module.exports = function(passport) {
	var localLoginStrategy = require('./local-login')(config);
	passport.use('local-login', localLoginStrategy);
};