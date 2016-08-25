var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var serviceSchema = new Schema({
	
	name: String,
	version: String,
	status: String,
	succes: String

});

mongoose.model('Service', serviceSchema);