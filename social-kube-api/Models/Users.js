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
		friend_requests:{
			type:[String],
			default:[],
		},
		request_sent:{
			type:[String],
			default:[],
		},
		full_name:{
			type:String,
		}
})

UserSchema.index({"user_name": "text", "family_name": "text", "given_name": "text", "nickname": "text","full_name": "text"});

 module.exports =  mongoose.model('UserSchema', UserSchema);

