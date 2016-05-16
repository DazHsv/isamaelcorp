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

schema.statics.alreadyExist = function(arr) {
	var statments = [];
	arr.forEach(function(el){
		statments.push(el);
	});

	this.findOne({
		$or: statments
	},function(err,user){
		if(user!=null){
			if(user.email == statments[0].email) return 1;
			else if(user.nickname == statments[1].nickname) return -1;
			else return 0;
		}
	});
};

module.exports = mongoose.model('User', schema);