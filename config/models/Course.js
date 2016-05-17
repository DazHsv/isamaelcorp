var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

// Estructura para el esquema de el objeto Curso
courseStructure = {
	owner:{ type:ObjectId, required:true, ref:'User' },
	title:{
		type:String,
		required:[true,'El curso debe de tener título']
	},
	description:{
		type:String,
		default:'No hay descripcion disponible'
	},
	category:String,
	tags:[{type:String}],
	published_date:{ type:Date, default:Date.now },
	public:{ type:Boolean, default:false },
	videos:[ { type:ObjectId, ref:'Video' } ],
	comments:[ { type:ObjectId, ref:'Comment' } ],
	votes: {
		positive:{ type:Number, default:0 },
		negative:{ type:Number,	default:0 }
	},
	image:String
}

var schema = new Schema(courseStructure);

schema.virtual('image.url')
	.get(function(){
		if ( this.image != "" )
			return this.image;
		
		return "/img/course_avatar.png";
	});

module.exports =  mongoose.model('Course', schema);