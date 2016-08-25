var Proyect = require('mongoose').model('Proyect');

exports.create = function(req, res, next){
	var proyect = new Proyect(req.body);
	proyect.save(function(err){
		if(err)
			return next(err);
		else
			res.json(proyect);
	});
};

exports.update= function(req, res, next) {
	Proyect.findByIdAndUpdate(req.proyect.id, req.body, function(err, proyect) {
        if (err) 
            return next(err);       
        else 
            res.json(proyect);       
    });
};

exports.remove= function (req, res, next) {
	req.proyect.remove(function(err) {
        if (err) 
            return next(err);
        else 
            res.json(req.proyect);
    }) 
};

exports.list= function(req, res, next) {
	Proyect.find({}, function(err, proyect) {
        if (err) 
            return next(err);       
        else 
            res.json(proyect);       
    });
};

exports.proyectByID = function(req, res, next, id)
{
	Proyect.findOne({
		_id: id
	},
	function(err, proyect)
	{
		if(err)
			next(err);
		else
		{
			req.proyect = proyect;
			next();
		}
	});
}