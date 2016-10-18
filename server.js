var express = require('express');
var http = require('http');
var sqlite3 = require('sqlite3').verbose();

var app = express();

app.get('/api/:table', function(req, res) {
	var db = new sqlite3.Database('data/SeradexTracker.sqlite');
	var output = [];
	var table = req.params.table;

	if(!table) {
		return res.status(400).send('Bad request, provide a table name');
	};

	db.each("SELECT * FROM " + table, function(err, row) {
      output.push(row);
  	}, function(err, count) {
  		if(err) {
  			return res.status(500).json(err);
  		};
  		res.json(output)
  	});

	db.close();
});


var port = process.env.PORT || 3000;
app.set('port', port);
var server = http.createServer(app);

app.listen(port, function() {
	console.log('server running, port:');
})