var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

var getv = 'Esto se mostrará al hacer el GET';

app.set('port', (process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.put('/demo-app/:local/:visitante',
	function(req, response){
		var mensaje = "Has indicado que el partido quedará " + req.params.local + " a " + req.params.visitante;
		
		response.send(mensaje);
	});

app.get('/demo-app',
	function(request, response){response.send(getv);});


app.listen(app.get('port'), function() {
	  console.log("Node app is running at localhost:" + app.get('port'));
});

module.exports = app;
