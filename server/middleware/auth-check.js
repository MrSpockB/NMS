var jwt = require('jsonwebtoken'),
	User = require('mongoose').model('User');

	module.exports = function(config)
	{
		return function(req, res, next)
		{
			if(req.method === "OPTIONS")
				next();

			if(!req.headers.authorization)
				return res.status(401).end();

			var token = req.headers.authorization.split(' ')[1];
			jwt.verify(token, config.jwtSecret, function(err, decoded)
			{
				if(err)
					return res.status(401).end();
				var userId = decoded.sub;
				User.findById(userId, function(err, user)
				{
					if (err || !user) {
						return res.status(401).end();
					}

					return next();

				});
			});
		};
	};