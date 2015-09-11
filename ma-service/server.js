// var express = require('express');
// var app =express();
// app.set('views', __dirname);
// // app.set('view engine', 'jade');
// app.use(express.static(__dirname));
// app.get('*',function(req,res){
// 	// res.render('index');
// 	res.sendFile(__dirname + '/index.html');
// });
// var server = app.listen(3000, function() {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log('Example app listening at http://%s:%s', host, port);
// });


var express = require('express'),
	bodyParser = require('body-parser'),
	config = require('./config'),
	pg = require('pg');

var app = express();

var http = require('http').Server(app);

pg.connect(config.database, function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log("Connected to the database");
	}
});

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	console.log('Time:', Date.now());
	next();
});

app.get('/', require('./public/test.js'));



// app.get('/', function(req, res) {
// 	res.send('Hello World!');
// });



http.listen(config.port, config.address, function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log("Listening in " + config.address + ":" + config.port);
	}
});