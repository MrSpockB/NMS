var proyects = require('../../server/controllers/proyectController');

module.exports = function(app)
{
	app.route('/proyects').post(proyects.create).get(proyects.list);
	app.param('proyectId', proyects.proyectByID);
	app.route('/proyects/:proyectId').delete(proyects.remove).update(proyects.update);
}