# Ejercicios Semana 4

## Ejercicio 1: Darse de alta en algún servicio PaaS tal como Heroku, zeit, BlueMix u OpenShift.

En este ejercicio nos hemos dado de alta en Heroku.

## Ejercicio 2: Crear una aplicación en OpenShift o en algún otro PaaS en el que se haya dado uno de alta. Realizar un despliegue de prueba usando alguno de los ejemplos incluidos con el PaaS.

Vamos a pasar a realizar el tutorial de Heroku para Node.js

Primero debemos instalar heroku desde el terminal con la siguiente línea de comandos:

''sudo snap install heroku --classic''

Seguidamente hacemos login con nuestra cuenta de usuario y podremos comenzar a preparar nuestra app.
Para ello vamos a clonar un repositorio de prueba existente en github.

''git clone https://github.com/heroku/node-js-getting-started.git''
''cd node-js-getting-started''

Hecho esto pasaremos a desplegar la aplicación.
Primero la crearemos con el sigueinte comando:

''heroku create''

Seguidamente desplegaremos el código.

''git push heroku master''

Y con esto ya tendremos nuestra app desplegada, a la cual podremos acceder mediante el comando:

''heroku open''


## Ejercicio 3: Realizar una app en express (o el lenguaje y marco elegido) que incluya variables como en el caso anterior.

Primero vamos a crear la app con express de la siguiente forma:

''express demo-app''

Accederemos al directorio creado para la app e instalaremos las dependencias con:

''npm install''

Hecho esto pasaremos a modificar el archivo app.js en el que introduciremos el código de nuestra aplicación:

''var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

var getv = 'Esto se mostrará al hacer el GET';

app.set('port', (process.env.PORT || 5000));
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
});''

Hecho esto podremos lanzarla haciendo uso de:

''node app.js''

Una vez lanzada podremos acceder a la app desde la dirección:

''localhost:5000/demo-app''


## Ejercicio 4: Crear pruebas para las diferentes rutas de la aplicación.


Para los test de prueba, primero vamos a crear un directorio test, en el que se ubicarán los archivos que harán los test.
Accederemos a este directorio e instalaremos las dependencias con:

''npm install''

Modificaremos el archivo app.js, añadiendo al final del mismo una línea que nos permita exportar la app creada.

''module.exports = app''

Hecho esto, instalaremos supertest con ''npm install supertest --save-dev''

Y dentro de la carpeta test, crearemos el archivo test-app.js que contendrá el siguiente código:

''var request = require('supertest'),
	app = require('../app.js');

	describe( "PUT demo-app", function() {
		it('should create', function (done) {
		request(app)
			.put('/demo-app/3/1')
			.expect('Content-Type', 'text/html; charset=utf-8')
			.expect(200,done);
		});
	});
''

Finalmente, pasaremos el test a nuestra app con mocha.


## Ejercicio 5: Instalar y echar a andar tu primera aplicación en Heroku.

Hecho en el ejercicio 2

## Ejercicio 6: Usar como base la aplicación de ejemplo de heroku y combinarla con la aplicación en node que se ha creado anteriormente. Probarla de forma local con foreman. Al final de cada modificación, los tests tendrán que funcionar correctamente; cuando se pasen los tests, se puede volver a desplegar en heroku.

He instalado foreman y he creado el archivo Procfile dentro de mi directorio de la aplicación incluyendo en él la sigueinte línea:

''web: node app.js''

De esta forma si lanzo posteriormente foreman start web nuestra aplicación se estará lanzando localmente.
No he llegado a combinar las dos aplicaciones, solamente probé foreman.



