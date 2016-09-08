var proyects = require('../controllers/proyectController');

module.exports = function(router)
{
	router.route('/proyects').post(proyects.create).get(proyects.list);
	router.param('proyectId', proyects.proyectByID);
	router.route('/proyects/:proyectId').delete(proyects.remove).put(proyects.update).get(proyects.read);
	router.route('/proyects/:proyectId/packages').get(proyects.packages);
}