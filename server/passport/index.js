var config = require('../config/config');

module.exports = function(passport) {

	var localSignupStrategy = require('./local-signup')(config);
	var localLoginStrategy = require('./local-login')(config);

	passport.use('local-signup', localSignupStrategy);
	passport.use('local-login', localLoginStrategy);
};