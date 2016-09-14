var Service = require('mongoose').model('Service');

module.exports = {
	index: 
	{
		get: function(req, res, next)
		{
			Service.find({}, function(err, services)
			{
				if(err)
					return next(err);
				else
					res.json(services);
			});
		},
		post: function(req, res, next)
		{
			var service = new Service(req.body);
			service.save(function(err)
			{
				if(err)
					return next(err);
				else
					res.json(service);
			});
		}
	},
	"view/:serviceId":
	{
		get: function(req, res, next)
		{
			Service.findOne({
				_id: req.params.serviceId
			},
			function(err, service)
			{
				if(err)
					next(err);
				else
				{
					res.json(service);
				}
			});
		},
		put: function(req, res, next)
		{
			Service.findByIdAndUpdate(req.params.serviceId, req.body, function(err, service) {
		        if (err) 
		            return next(err);       
		        else 
		            res.json(service);       
		    });
		},
		delete: function(req, res, next)
		{
			Service.findOne({
				_id: req.params.serviceId
			},
			function(err, service)
			{
				if(err)
					next(err);
				else
				{
					service.remove(function(err) {
				        if (err) 
				            return next(err);
				        else 
				            res.json(req.service);
				    });
				}
			});
		}
	}
};