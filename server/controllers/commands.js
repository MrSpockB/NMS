var fs = require('fs'),
    path = require('path'),
    os = require('os');
var spawn = require('child_process').spawn;
var config = require('./../config/config');

module.exports =
{
	test:
	{
		get: function(req, res, next)
		{
			var ls = spawn('node',['-v']);
			var result = '';
			ls.stdout.on('data', (data) => {
				result += data.toString();
			});

			ls.stderr.on('data', (data) => {
				console.log(`stderr: ${data}`);
			});

			ls.on('close', (code) => {
				return res.json({data: result});
			  	console.log(`child process exited with code ${code}`);
			});
		}
	},
	root:
	{
		get: function(req, res, next)
		{
			res.json(dirTree(config.rootPath));
		}
	},
	makedir:
	{
		post: function(req, res, next)
		{
			var resPath = req.body.path.replace(config.rootPath, '');
			if (resPath.substring(0, 1) == '\\') { 
			  resPath = resPath.substring(1);
			}
			resPath = config.rootPath + path.sep + resPath + path.sep + req.body.directory;
			var success, message;
			fs.mkdir(resPath, 0777, function(err)
			{
				if(err)
				{
					success = false;
					message = err.code;
					if(err.code == 'EEXIST')
					{
						message = "La carpeta ya existe";
					}
				}
				else
				{
					success = true;
					message = "Se creo la carpeta";
				}
				res.json({success: success, msg: message});
			});
		}
	}
}
function dirTree(filename) 
{
    var stats = fs.lstatSync(filename),
        info = {
            path: filename,
            name: path.basename(filename)
        };

    if (stats.isDirectory()) {
        info.type = "folder";
        info.children = fs.readdirSync(filename).map(function(child) {
            return dirTree(filename + path.sep + child);
        });
    } else {
        info.type = "file";
    }

    return info;
}