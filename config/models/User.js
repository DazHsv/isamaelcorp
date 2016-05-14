var ObjectId = require('mongoose').Schema.Types.ObjectId;

// Estructura para el esquema de el objeto Usuario
userStructure = {
	nickname:{ type:String, required:true,
		minlength:6,
		maxlength:30
	},
	name:{
		first:{ type:String, required:true},
		last:{ type:String, required:true}
	},
	dates: {
		birth: {
			day: { type:Number, required:true },
			month: { type:Number, required:true,
				min:1, max:12 },
			year: { type:Number, required:true,
				min:1970 }
		},
		register: { type:Date, default:Date.now}
	},
	email:{ type:String, required:true },
	pwd:{ type:String, required:true },
	verified:{ type:Boolean, default:false },
	videos:[ { type:ObjectId, ref:'Video',default:[] } ],
	courses: {
		subscribed: [ { type:ObjectId, ref:'Course', default:[] }],
		created: [ { type:ObjectId, ref:'Course', default:[] }]
	},
	avatar_url:String
}

module.exports = userStructure;