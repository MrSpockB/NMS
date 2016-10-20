var User = require('mongoose').model('User');

module.exports = {
	index: 
	{
		get: function(req, res, next)
		{
			User.find({}, function(err, users)
			{
				if(err)
					return next(err);
				else
					res.json(users);
			});
		},
		post: function(req, res, next)
		{
			var user = new User(req.body);
			user.save(function(err)
			{
				if(err)
					return next(err);
				else
					res.json(user);
			});
		}
	},
	"view/:userId": {
		get: function(req, res, next)
		{
			User.findOne({
				_id: req.params.userId
			},
			function(err, user)
			{
				if(err)
					next(err);
				else
				{
					res.json(user);
				}
			});
		},
		put: function(req, res, next)
		{
			User.findOneAndUpdate({_id: req.params.userId}, req.body, function(err, user) {
		        if (err) 
		            return next(err);       
		        else 
		        {
		        	user.save();
		            res.json(user);       
		        }
		    });
		}
	}
};