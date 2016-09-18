var Proyect = require('mongoose').model('Proyect');
var fs = require('fs'), obj;

module.exports = {
	index: 
	{
		get: function(req, res, next)
		{
			console.log(res.username);
			Proyect.find({username: res.username}, function(err, proyects)
			{
				if(err)
					return next(err);
				else
					res.json(proyects);
			});
		},
		post: function(req, res, next)
		{
			var proyect = new Proyect(req.body);
			proyect.save(function(err)
			{
				if(err)
					return next(err);
				else
					res.json(proyect);
			});
		}
	},
	"view/:proyectId":
	{
		get: function(req, res, next)
		{
			Proyect.findOne({
				_id: req.params.proyectId
			},
			function(err, proyect)
			{
				if(err)
					next(err);
				else
				{
					res.json(proyect);
				}
			});
		},
		put: function(req, res, next)
		{
			Proyect.findByIdAndUpdate(req.params.proyectId, req.body, function(err, proyect) {
		        if (err) 
		            return next(err);       
		        else 
		            res.json(proyect);       
		    });
		},
		delete: function(req, res, next)
		{
			Proyect.findOne({
				_id: req.params.proyectId
			},
			function(err, proyect)
			{
				if(err)
					next(err);
				else
				{
					proyect.remove(function(err) {
				        if (err) 
				            return next(err);
				        else 
				            res.json(req.proyect);
				    });
				}
			});
		}
	},
	"view/:proyectId/packages":
	{
		get: function(req, res, next)
		{
			Proyect.findOne({
				_id: req.params.proyectId
			},
			function(err, proyect)
			{
				if(err)
					next(err);
				else
				{
					console.log(proyect.route);
					var finalData = {};
					var deps = [];
					var devDeps = [];
					var obj = { name: '', version: '' };
					fs.readFile(proyect.route+'/package.json', function(err, data){
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
				}
			});
		}
	}
};