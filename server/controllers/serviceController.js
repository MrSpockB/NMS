var Service = require('mongoose').model('Service');

exports.create = function(req, res, next){
	var service = new Service(req.body);
	service.save(function(err){
		if(err)
			return next(err);
		else
			res.json(service);
	});
};

exports.update= function(req, res, next) {
	Service.findByIdAndUpdate(req.service.id, req.body, function(err, service) {
        if (err) 
            return next(err);       
        else 
            res.json(service);       
    });
};

exports.remove= function (req, res, next) {
	req.service.remove(function(err) {
        if (err) 
            return next(err);
        else 
            res.json(req.service);
    }) 
};

exports.list= function(req, res, next) {
	Service.find({}, function(err, service) {
        if (err) 
            return next(err);       
        else 
            res.json(service);       
    });
};

exports.serviceByID = function(req, res, next, id)
{
	Service.findOne({
		_id: id
	},
	function(err, service)
	{
		if(err)
			next(err);
		else
		{
			req.service = service;
			next();
		}
	});
}