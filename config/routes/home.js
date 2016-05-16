var router = require('express').Router();
var Course = require('../models/Course');

router.get('/',function(req,res){
	Course.find({},function(err,course){
		res.render('app/home',{cursos:course});
	});
});

module.exports = router;