module.exports = {
	bindUtilities: bindUtilities
}

function bindUtilities(req, res, next) {
	res.sendError = function(code, message, error) {
		var json = {
			'status': code,
			'message': message
		};
		if (error) {
			json.error = error;
			console.log(error.stack)
		}

		this.status(code).json(json);
	}

	next();
}
