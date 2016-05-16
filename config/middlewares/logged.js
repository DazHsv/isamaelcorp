module.exports = function(req,res,next){
	var session = req.session;
	if(!session && !session.user){
		
	}else{
		next();
	}
}