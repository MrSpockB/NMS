var commands = require('../controllers/commandController');

module.exports = function(app)
{
	app.route('/test').get(commands.test);
}