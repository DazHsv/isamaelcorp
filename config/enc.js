// Función para encodear las contraseñas antes de ser guardadas en la DB.
// De igual forma se utiliza para comparar contraseñas al momento de loggearse
module.exports = function(a){
	var e = a;
	for (var i = 0; i < 1; i++) {
		e = new Buffer(
				new Buffer(
					new Buffer(e).toString('base64')
				).toString('hex')
			).toString('base64');
	}
	return e;
};