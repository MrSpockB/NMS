var users = require('../controllers/userController');

module.exports = function(router)
{
	router.route('/users').post(users.create).get(users.list);
	router.param('userId', users.userByID);
	router.route('/users/:userId').get(users.read);
}