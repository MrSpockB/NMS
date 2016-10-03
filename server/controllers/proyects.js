var Proyect = require('mongoose').model('Proyect');
var fs = require('fs'), obj;
var spawn = require('child_process').spawn;

module.exports = {
	index: 
	{
		get: function(req, res, next)
		{
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
				{
					var npm = spawn('npm',['init', '-y'], {cwd: proyect.route,  shell: true});
					var result = '';
					npm.stdout.on('data', (data) => {
						result += data.toString();
					});
					npm.on('close', (code) => {
						//console.log(result);
						res.json(proyect);
					  	console.log(`child process exited with code ${code}`);
					})
					npm.on('error', function(err){
						throw err;
					})
				}
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
		},
		post: function(req, res, next)
		{
			Proyect.findOne({
				_id: req.params.proyectId
			},
			function(err, proyect)
			{
				var result = "";
				var npm = spawn('npm',['install', req.body.package, '--save'], {cwd: proyect.route,  shell: true});
				npm.stdout.on('data', (data) => {
					result += data.toString();
				});
				npm.on('close', (code) => {
					console.log(result);
					res.json({success: true});
				  	console.log(`child process exited with code ${code}`);
				});
				npm.on('error', function(err){
					res.json({success: false, err: err.message});
				});
			});
		}
	},
	"view/:proyectId/run":
	{
		
	}
};