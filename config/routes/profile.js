var router = require('express').Router();
var Course = require('../models/Course');
var logged = require('../middlewares/logged');

router.get('/',logged,function(req,res){
	
});

module.exports = router;