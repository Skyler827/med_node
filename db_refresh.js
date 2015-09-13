var database_ref = "postgres://postgres:postgres@localhost/testdb";
var pg = require('pg');

pg.connect(database_ref, function (err, client, done) {
	var query = client.query("DROP DATABASE IF EXISTS med_node;");
	query.on('end', function(result) {
		var query = client.query("CREATE DATABASE med_node;")
		query.on('end', function(result) {
			require('./app.js');
		});
	});
});
