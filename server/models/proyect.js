var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var proyectSchema = new Schema({
	
	name: String,
	language: String,
	username: String,
	route: String,
	entry_point: String

});

mongoose.model('Proyect', proyectSchema);