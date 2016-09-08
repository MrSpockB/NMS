var spawn = require('child_process').spawn;


exports.test = function(req, res, next)
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
};