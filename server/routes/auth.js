var auth = require('../controllers/auth');
module.exports = function(app)
{
	app.post('/signup', auth.signup);
	app.post('/login', auth.login);
}