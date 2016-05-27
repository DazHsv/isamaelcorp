var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

// Estructura para el esquema de el objeto Curso
miniCourseStructure = {
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
	tags:[{type:String, default:[]}],
	published_date:{ type:Date, default:Date.now },
	public:{ type:Boolean, default:false },
	comments:[ { type:ObjectId, ref:'Comment', default:[] } ],
	votes: {
		pos:{ type:Number, default:0 },
		neg:{ type:Number,	default:0 }
	},
	image:String
}

courseStructure = miniCourseStructure;
miniCourseStructure.player_url = {type:String, required:true};
miniCourseStructure.url = {type:String, required:true};

courseStructure.videos = [ { type:ObjectId, ref:'Video', default:[] } ];

var miniCourseSchema = new Schema(miniCourseStructure);
var courseSchema = new Schema(courseStructure);

miniCourseSchema.virtual('image.url')
	.get(function(){
		if ( this.image != "" )
			return this.image;
		
		return "/img/course_avatar.png";
	});

courseSchema.virtual('image.url')
	.get(function(){
		if ( this.image != "" )
			return this.image;
		
		return "/img/course_avatar.png";
	});
courseSchema.virtual('date').get(function(){
	var date = new Date(this.published_date);
	return date.toLocaleDateString("es-MX");
});
miniCourseSchema.virtual('date').get(function(){
	var date = new Date(this.published_date);
	return date.toLocaleDateString("es-MX");
});

module.exports = {
	Course: mongoose.model('Course', courseSchema),
	MiniCourse: mongoose.model('MiniCourse', miniCourseSchema)
};