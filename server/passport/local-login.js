var bcrypt = require('bcrypt-nodejs'),
	jwt = require('jsonwebtoken'),
	User = require('mongoose').model('User'),
	passportLocalStrategy = require('passport-local').Strategy;

module.exports = function(config)
{
	return new passportLocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		session: false,
		passReqToCallback: true
	}, function(req, email, password, done) {
		var userData = 
		{
			email: email.trim(),
			password: password.trim()
		};
		User.findOne({email: userData.email}, function(err, user) 
		{
			if(err)
				return done(err);
			if(!user)
			{
				let error = new Error("Email o contraseña incorrecta");
				error.name = "CredencialesIncorrectasError";
				return done(error);
			}
			user.comparePassword(userData.password, function(err, isMatch) {
				if(err)
					return done(err);
				if(!isMatch)
				{
					let error = new Error("Email o contraseña incorrecta");
					error.name = "CredencialesIncorrectasError";
					return done(error);
				}
				let payload = 
				{
					sub: user._id,
				};
				let token = jwt.sign(payload, config.jwtSecret);
				let userData = {
					name: user.name
				};
				return done(null, token, userData);
			})
		});

	});
};