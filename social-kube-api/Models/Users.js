var mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
	// unique username or sub
		user_name: {
			type:String,
			require:true,
			unique:true
		},
		given_name:{
			type:String,
		},
		family_name:{
			type:String,
		},
		nickname: {
			type:String,
		},
		picture: {
			type:String,
		},
		locale:{
			type:String,
		},
		gender:{
			type:String,
		}
})

 module.exports =  mongoose.model('UserSchema', UserSchema);

