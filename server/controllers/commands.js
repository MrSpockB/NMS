var fs = require('fs'),
    path = require('path');
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
			console.log(req.body.directory);
			var success, message;
			fs.mkdir(config.rootPath+'\\'+req.body.directory, 0777, function(err)
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
			})
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
            return dirTree(filename + '\\' + child);
        });
    } else {
        info.type = "file";
    }

    return info;
}