var services = require('../../server/controllers/serviceController');

module.exports = function(app)
{
	app.route('/services').post(services.create).get(services.list);
	app.param('serviceId', services.serviceByID);
	app.route('/services/:serviceId').delete(services.remove).put(services.update);
}