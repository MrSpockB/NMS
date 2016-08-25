var users = require('../controllers/userController');

module.exports = function(app)
{
	app.route('/users').post(users.create).get(users.list);
	app.param('userId', users.userByID);
	app.route('/users/:userId').get(users.read);
}