// Definimos los módulos que necesitamos
var express = require('express');
var app = express();
var path = require('path');
var expressLayouts = require('express-ejs-layouts');
var csv = require('./server.js');

// ¿Estos modulos los necesitamos?
//var _ = require('underscore');
//var $ = require('jquery');


// Definimos la configuración de la aplicación.
app.set('port', (process.env.PORT || 3000));  // Puerto de escucha
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
//app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/public'));


//  Asociamos cada ruta con una función encargada de controlar la acción a ejecutar.
app.get('/', function (request, response) {
    response.render('index', { title: 'Comma Separated Value Analyzer' });
});

// ¿Esta funcion la necesitamos?
//app.get('/ajaxEx/:cad', function (request, response) {
//   response.send(JSON.stringify(csv.calculate(request.params.cad)));
//});

// ¿Esta función la necesitamos?
app.get('/tests/', function (request, response) {
   response.render('/tests/index', { title: 'CSV test' });

app.get('/pr', function (request, response) {
	    response.send({ "rows": rows });
}


// Arrancamos el servidor
app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'));
});


});
