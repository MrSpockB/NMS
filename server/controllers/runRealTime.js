var Proyect = require('mongoose').model('Proyect');
var fs = require('fs');
var spawn = require('child_process').spawn;
var node;

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
				console.log(proyect.route);
				node = spawn('node',[data.name], {cwd: proyect.route});
				node.stdout.on('data', (data) => {
					var result = data.toString();
					console.log(result);
					io.emit('shellOutput', result);
				});
			});
		})
		socket.on('stopProject',function()
		{
			node.kill('SIGINT');
			console.log('stop');
		})
	});
}