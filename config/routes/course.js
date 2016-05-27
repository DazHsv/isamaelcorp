var router = require('express').Router();
var Course = require('../models/Course').Course;
var MiniCourse = require('../models/Course').MiniCourse;

router.post('/',function(req,res){
	var curso =  new Course({
		owner: req.session.user.id,
		title: req.body.title,
		description: req.body.description
	});

	curso.save(function(err){
		if(!err) res.redirect('/e/course/'+curso._id);

	});
});

router.get('/new',function(req,res){
	res.render('app/curso/new',{
		logged: (req.session != null ? true : false )
	});
});

router.get('/:id',function(req,res){
	Course
		.findOne({
			_id:req.params.id
		})
		.populate('owner')
		.exec(function(err,c){
			if(!err){
				console.log(c);
				console.log(err);
				res.render('app/curso/curso',{
					curso: c,
					logged: (req.session != null ? true : false )
				});
			}else {
				res.redirect('/e/404');
			}
		});
});

module.exports = router;