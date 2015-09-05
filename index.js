var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var config = require('config');


var app = express();

configureApp();
configureHttpLogger();
configureCors();
connectToDatabase();
configureMiddleware();
configureRoutes();
startServer();

function configureApp() {
	app.use(bodyParser.json());
	app.use(express.static(path.join(__dirname, 'dist')));
}

function configureHttpLogger() {
    if (config.get('logging.http.enabled')) {    
		if (app.get('env') == 'production') {
			app.use(morgan('combined', {
				skip: function(req, res) {
					return res.statusCode < 400;
				},
				stream: path.join(__dirname, '/http-requests.log')
			}));
		} else {
			app.use(morgan('dev'));
		}
	}
}

function configureCors() {
	app.all('/*', function(req, res, next) {
		var allowedMethods = 'GET,PUT,POST,DELETE,OPTIONS';
		var allowerHeaders = 'Content-type,Accept,X-Access-Token,X-Key';

		res.header('Access-Control-Allow-Origin', config.get('security.cors.restrictToDomain'));
		res.header('Access-Control-Allow-Methods', allowedMethods);
		res.header('Access-Control-Allow-Headers', allowerHeaders);
		if (req.method == 'OPTIONS') {
			res.status(200).end();
		} else {
			next();
		}
	});
}

function connectToDatabase() {
	require('./db');
}



function configureMiddleware() {
    app.use(require('./middleware/utilities').bindUtilities);

	app.all('/api/v1/private/*', [ require('./middleware/security').authenticate ]);
	app.all('/api/v1/private/admin/*', [ require('./middleware/security').authorizeAdmin ]);
    
    app.all('/api/v1/*', [ require('./middleware/utilities').nocache ]);
}

function configureRoutes() {
	app.use('/', require('./routes'));

    
	// catch errors
	app.use(function(err, req, res, next) {
		// treat as 404
		if (err.message && (~err.message.indexOf('Cast to ObjectId failed'))) {
			return next();
		}

		console.log(err.stack);
		res.sendError(500, err.message, err);
	});
    
  	// didn't match any route
	app.use(function(req, res, next) {
		res.sendError(404, 'Route not found');
	});
    
}

function startServer() {
	app.set('port', process.env.PORT || 3000);

	var server = app.listen(app.get('port'), function() {
		console.log('server started on ' + server.address().port);
	});
}
