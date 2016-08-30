var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var serviceSchema = new Schema({
	
	name: String,
	version: String,
	status: Boolean,
	success: Boolean

});

mongoose.model('Service', serviceSchema);