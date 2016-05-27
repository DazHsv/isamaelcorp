var router = require('express').Router();
var Course = require('../models/Course').Course;
var MiniCourse = require('../models/Course').MiniCourse;

router.get('/',function(req,res){
	var logged = false;
	if(req.session.user) logged = true;
	var cursos = {
		cursos: [],
		minicurso: []
	};

	Course
		.find({})
		.sort('-published_date')
		.limit(8)
		.populate('owner')
		.exec(function(err,curso){
			cursos.curso = curso;
			MiniCourse
				.find({})
				.sort('-published_date')
				.limit(8)
				.populate('owner')
				.exec(function(err, minicurso){
					cursos.minicurso = minicurso;
					res.render('app/home',{
						cursos:cursos,
						logged:logged
					});
					console.log(cursos);
			});
	});


});

router.get('/post_registry',function(req,res){
	res.render('app/user/post_registry');
});

router.get('/terms',function(req,res){
	res.render('app/user/terms');
});

router.get('/logout',function(req,res){
	if(req.session && req.session.user){
		req.session.destroy(function(){
			res.redirect('/e/');
		});
	}
});

module.exports = router;