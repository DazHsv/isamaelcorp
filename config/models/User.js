var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

// Estructura para el esquema de el objeto Usuario
userStructure = {
	nickname:{ type:String, required:true,
		minlength:6,
		maxlength:30
	},
	name: { type:String, required:true },
	dates: {
		register: { type:Date, default:Date.now}
	},
	email: { type:String, required:true },
	pwd: { type:String, required:true },
	verified: { type:Boolean, default:false },
	videos: [ { type:ObjectId, ref:'Video',default:[] } ],
	courses: {
		subscribed: [ { type:ObjectId, ref:'Course', default:[] }],
		created: [ { type:ObjectId, ref:'Course', default:[] }]
	},
	avatar_url:String,
	acceptedTerms:{
		type:Boolean,
		default:false
	}
}

var schema = new Schema(userStructure);

schema.statics.alreadyExist = function(email,nickname) {

	this.findOne({
		$or: [{email:email},{nickname:nickname}]
	},function(err,user){
		if(user!=null){
			if(user.email == email) return 1;
			else if(user.nickname == nickname) return -1;
			else return 0;
		}
	});
};

module.exports = mongoose.model('User', schema);