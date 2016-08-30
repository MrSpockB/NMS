var proyects = require('../../server/controllers/proyectController');

module.exports = function(router)
{
	router.route('/proyects').post(proyects.create).get(proyects.list);
	router.param('proyectId', proyects.proyectByID);
	router.route('/proyects/:proyectId').delete(proyects.remove).put(proyects.update);
}