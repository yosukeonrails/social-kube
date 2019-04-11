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
			require:true,
		},
		family_name:{
			type:String,
			require:true,
		},
		nickname: {
			type:String,
			require:true,
		},
		picture: {
			type:String,
		},
		locale:{
			type:String,
		},
		gender:{
			type:String,
		},
		friends:{
			type:[String],
		},
		friend_request:{
			type:[String],
		},
})

 module.exports =  mongoose.model('UserSchema', UserSchema);

