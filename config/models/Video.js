var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

// Estructura para el esquema de el objeto Video
videoStructure = {
	owner:{
		type:ObjectId,
		ref:'User',
		required:true
	},
	title:{
		type:String,
		required:true
	},
	description:{
		type:String,
		default:''
	},
	category:String,
	tags:[ {type:String} ],
	course:{
		type:ObjectId,
		ref:'Course',
		required:true
	},
	published_date:{ type:Date, default:Date.now },
	public:{ type:Boolean, default:false },
	url:{ type:String, required:true},
	votes:{
	  positive:{type:Number,default:0 },
	  negative:{type:Number,default:0 }
	},
	comments:[{type:ObjectId, ref:'Comment'}]
}

module.exports = mongoose.model('Video', new Schema(videoStructure));