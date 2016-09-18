var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var proyectSchema = new Schema({
	
	name: String,
	language: String,
	username: String,
	route: String

});

mongoose.model('Proyect', proyectSchema);