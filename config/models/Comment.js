var ObjectId = require('mongoose').Schema.Types.ObjectId;

// Estructura para el esquema de el objeto Comentario
commentStructure = {
	owner:{ type:ObjectId, ref:'User'},
	title:{ type:String, required:true },
	body:{ type:String, required:true, maxlength:800},
	date:{ type:Date, default:Date.now },
	votes:{
		positive:{ type:Number, default:0 },
		negative:{ type:Number, default:0 }
	},
	reply:[ { type:ObjectId, ref:'Reply' } ]
}

// Estructura de las respuestas en los comentarios
replyStructure = {
	owner:{ type:ObjectId, ref:'User' },
	body:{ type:String, required:true, maxlength:800},
	published_date:{ type:Date, default:Date.now }
}

module.exports.Comment = commentStructure;
module.exports.Reply = replyStructure;