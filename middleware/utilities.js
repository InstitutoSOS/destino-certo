module.exports = {
	bindUtilities: bindUtilities,
    nocache: nocache
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

function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

