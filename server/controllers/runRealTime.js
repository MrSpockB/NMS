var Proyect = require('mongoose').model('Proyect');
var fs = require('fs');
var spawn = require('child_process').spawn;
var config = require('./../config/config');
var tcpPortUsed = require('tcp-port-used');
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
					tcpPortUsed.check(data.port)
					.then(function(inUse)
					{
						console.log(inUse);
						if(!inUse)
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
							 	var result = d.toString();
								console.log(result);
								io.emit('shellOutput', result);
							});
							runProject.on('close', function(code){
								io.emit('shellOutput', "El proceso se ha detenido");	
							});
						}
						else
						{
							io.emit('shellOutput', "El puerto esta en uso");	
						}
						
					});
				}
			});
		});
		socket.on('stopProject',function()
		{
			runProject.kill();
			
			console.log('stopSignal');
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
						console.log('stdout: '+result);
						io.emit('packageInstallOutput', result);
					});
					npm.stderr.on('data', (data) => {
					  	var result = data.toString();
						console.log("stderr: "+result);
						io.emit('packageInstallOutput', result);
					});
					npm.on('error', function(err){
						var result = err.message;
						console.log(result);
						io.emit('packageInstallOutput', result);
					});
					npm.on('close', function(code){
						io.emit('finishInstallOutput', code);	
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
					composer.stderr.on('data', (data) => {
					  	var result = data.toString();
						console.log('stdout: '+result);
						io.emit('packageInstallOutput', result);
					});
					composer.on('error', function(err){
						var result = err.message;
						console.log("stderr: "+result);
						io.emit('packageInstallOutput', result);
					});
					composer.on('close', function(code){
						io.emit('finishInstallOutput', code);	
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
		socket.on('runCmd', function(data){
			var cmdData = data.split(" ");
			console.log(cmdData.slice(1));
			cmd = spawn(cmdData[0], cmdData.slice(1), { shell: true, cwd: config.rootPath});
			cmd.stdout.on('data', (data) => {
				console.log(data.toString());
			  	io.emit('cmdOutput', data.toString());
			});

			cmd.stderr.on('data', (data) => {
				console.log(data.toString());
			  	io.emit('cmdOutput', data.toString());
			});

			cmd.on('close', (code) => {
			  io.emit('cmdFinish');
			});
		});
		socket.on('runCmdInProyectRoute', function(data){
			var cmdData = data.cmd.split(" ");
			console.log(cmdData.slice(1));
			cmd = spawn(cmdData[0], cmdData.slice(1), { shell: true, cwd: data.route});
			cmd.stdout.on('data', (data) => {
				console.log(data.toString());
			  	io.emit('cmdOutput', data.toString());
			});

			cmd.stderr.on('data', (data) => {
				console.log(data.toString());
			  	io.emit('cmdOutput', data.toString());
			});

			cmd.on('close', (code) => {
			  io.emit('cmdFinish');
			});
		});
	});
}