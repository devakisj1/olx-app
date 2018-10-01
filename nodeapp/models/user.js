var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodedb');

var db = mongoose.connection;

var UserSchema = mongoose.Schema({
	name: {
		type:String,

	},
	password:{
		type:String
	},
});

var User = module.exports = mongoose.model('users',UserSchema);

module.exports.createUser =function(newUser, callback){
	newUser.save(callback);
}
