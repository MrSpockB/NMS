var Proyect = require('mongoose').model('Proyect');
var fs = require('fs'), obj;
var path = require('path');
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
					var init;
					var result = '';
					if(proyect.language === "Javascript")
					{
						fs.access(proyect.route+path.sep+'package.json', fs.F_OK, function(err) 
						{
						    if (!err)
						    {
						    	console.log("Existe package.json");
						    	res.json(proyect);
						    }
						    else
						    {
						    	console.log("No existe package.json");
						        init = spawn('npm',['init', '-y'], {cwd: proyect.route,  shell: true});
						        init.stdout.on('data', (data) => {
						        	result += data.toString();
						        });
						        init.on('close', (code) => {
						        	//console.log(result);
						        	res.json(proyect);
						          	console.log(`child process exited with code ${code}`);
						        });
						        init.on('error', function(err){
						        	throw err;
						        });
						    }
						});
					}
					else if( proyect.language === "PHP")
					{
						fs.access(proyect.route+path.sep+'composer.json', fs.F_OK, function(err) 
						{
						    if (!err)
						    {
						    	console.log("Existe composer.json");
						        res.json(proyect);
						    }
						    else
						    {
						    	console.log("No existe composer.json");
						        spawn('composer',['init', '-n'], {cwd: proyect.route,  shell: true});
						    }
						});
						init = spawn('addAlias.py',[proyect.route, proyect.name], {shell: true});
						init.stdout.on('data', (data) => {
							result += data.toString();
						});
						init.on('close', (code) => {
							//console.log(result);
							res.json(proyect);
						  	console.log(`child process exited with code ${code}`);
						});
						init.on('error', function(err){
							throw err;
						});
					}
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
					if(proyect.language === "Javascript")
					{
						fs.readFile(proyect.route+'/package.json', function(err, data)
						{
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
					else if( proyect.language === "PHP")
					{
						fs.readFile(proyect.route+'/composer.json', function(err, data)
						{
							if(err)
								next(err);
							obj = JSON.parse(data);
							if(obj.hasOwnProperty('require'))
							{
								for(var key in obj['require'])
								{
									deps.push({ name: key, version: obj["require"][key]});
								}
							}
							if(obj.hasOwnProperty('require-dev'))
							{
								for(var key in obj['require-dev'])
								{
									devDeps.push({ name: key, version: obj["require-dev"][key]});
								}
							}
							finalData["deps"] = deps;
							finalData["devDeps"] = devDeps;
							res.json(finalData);
						});
					}
				}
			});
		}
	},
	"view/:proyectId/folder":
	{
		get: function(req, res, next)
		{
			Proyect.findOne({
				_id: req.params.proyectId
			},
			function(err, proyect)
			{
				res.json(dirTree(proyect.route, 1));
			});
		}
	}
};

function dirTree(filename, level) 
{
    var stats = fs.lstatSync(filename),
        info = {
            path: filename,
            name: path.basename(filename)
        };

    if (stats.isDirectory() && level > 0) {
        info.type = "folder";
        info.children = fs.readdirSync(filename).map(function(child) {
            return dirTree(filename + path.sep + child, level-1);
        });
    } else {
        info.type = "file";
    }

    return info;
}