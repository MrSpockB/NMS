var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,
	email: { type: String, index: { unique: true }},
	username: String,
	password: String
});

userSchema.methods.comparePassword = function(password, callback)
{
	bcrypt.compare(password, this.password, callback);
}
userSchema.pre('save', function(next){
	var user = this;
	bcrypt.genSalt(10, function(err, salt){
		if(err)
			return next(err);
		
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if(err)
				return next(err);
			user.password = hash;
			return next();
		});
	});
});

mongoose.model('User', userSchema);