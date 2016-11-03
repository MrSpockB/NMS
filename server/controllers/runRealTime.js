var Proyect = require('mongoose').model('Proyect');
var fs = require('fs');
var spawn = require('child_process').spawn;
var runProject;

module.exports = function(io)
{
	io.on('connection', (socket) =>
	{
		console.log('a user connected');
		socket.on('disconnect', () =>
		{
			console.log('user disconnected');
		});
		socket.on('runProject', function(data)
		{
			Proyect.findOne({
				_id: data.id
			},
			function(err, proyect)
			{
				if(proyect.language === "Javascript")
				{
					var env = process.env;
					env["PORT"] = data.port;
					runProject = spawn('node', [data.name], {cwd: proyect.route, env: env, shell: true});
					runProject.stdout.on('data', (d) => {
						var result = d.toString();
						console.log(result);
						io.emit('shellOutput', result);
					});
					runProject.stderr.on('data', (d) => {
					 	console.log(`stderr: ${d}`);
					});
				}
			});
		});
		socket.on('stopProject',function()
		{
			runProject.kill('SIGINT');
			console.log('stop');
		});
		socket.on('installPackage', function(data)
		{
			var depType = "";
			Proyect.findOne({
				_id: data.id
			},
			function(err, proyect)
			{
				if(proyect.language === "Javascript")
				{
					if(data.dev)
						depType = '--save-dev';
					else
						depType = '--save';
					var npm = spawn('npm',['install', data.package, depType], {cwd: proyect.route,  shell: true});
					npm.stdout.on('data', (data) => {
						var result = data.toString();
						console.log(result);
						io.emit('packageInstallOutput', result);
					});
					npm.on('error', function(err){
						var result = err.message;
						console.log(result);
						io.emit('packageInstallOutput', result);
					});
					npm.on('close', function(code){
						io.emit('packageInstallOutput', code);	
					});
				}
				else if(proyect.language === "PHP")
				{
					if(data.dev)
						depType = '--dev';
					var composer = spawn('composer',['require', data.package, depType], {cwd: proyect.route,  shell: true});
					composer.stdout.on('data', (data) => {
						var result = data.toString();
						console.log(result);
						io.emit('packageInstallOutput', result);
					});
					composer.on('error', function(err){
						var result = err.message;
						console.log(result);
						io.emit('packageInstallOutput', result);
					});
					composer.on('close', function(code){
						io.emit('packageInstallOutput', code);	
					});
				}
			});
		});
		socket.on('uninstallPackage', function(data)
		{
			var depType = "";
			Proyect.findOne({
				_id: data.id
			},
			function(err, proyect)
			{
				if(proyect.language === "Javascript")
				{
					if(data.dev)
						depType = '--save-dev';
					else
						depType = '--save';
					var npm = spawn('npm',['uninstall', data.package, depType], {cwd: proyect.route,  shell: true});
					npm.stdout.on('data', (data) => {
						var result = data.toString();
						console.log(result);
						io.emit('packageInstallOutput', result);
					});
					npm.on('error', function(err){
						var result = err.message;
						console.log(result);
						io.emit('packageInstallOutput', result);
					});
				}
				else if(proyect.language === "PHP")
				{
					if(data.dev)
						depType = '--dev';
					var composer = spawn('composer',['remove', data.package, depType], {cwd: proyect.route,  shell: true});
					composer.stdout.on('data', (data) => {
						var result = data.toString();
						console.log(result);
						io.emit('packageInstallOutput', result);
					});
					composer.on('error', function(err){
						var result = err.message;
						console.log(result);
						io.emit('packageInstallOutput', result);
					});
				}
			});
		});
	});
}