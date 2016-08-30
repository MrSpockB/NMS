var services = require('../../server/controllers/serviceController');

module.exports = function(router)
{
	router.route('/services').post(services.create).get(services.list);
	router.param('serviceId', services.serviceByID);
	router.route('/services/:serviceId').delete(services.remove).put(services.update);
}