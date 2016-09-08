var Proyect = require('mongoose').model('Proyect');
var fs = require('fs'), obj;

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
exports.read = function (req, res)
{
	res.json(req.proyect);
}
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

exports.packages = function(req, res, next)
{
	console.log(req.proyect.route);
	var finalData = {};
	var deps = [];
	var devDeps = [];
	var obj = { name: '', version: '' };
	fs.readFile(req.proyect.route+'/package.json', function(err, data){
		if(err)
			next(err);
		obj = JSON.parse(data);
		if(obj["dependencies"] !== undefined)
		{
			Object.keys(obj["dependencies"]).forEach(function(el){
				deps.push({ name: el, version: obj["dependencies"][el]});
			});
		}
		if(obj["devDependencies"] !== undefined)
		{	
			Object.keys(obj["devDependencies"]).forEach(function(el){
				devDeps.push({ name: el, version: obj["devDependencies"][el]});
			});
		}
		finalData["deps"] = deps;
		finalData["devDeps"] = devDeps;
		res.json(finalData);
	});
};