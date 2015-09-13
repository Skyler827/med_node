var express = require('express');
var fs = require('fs');
var db = require('./data.js');

var app = express();

// refresh db
db.execute_sql_file("dropdb.sql");
app.get('/', function(req, res) {
    console.log(req.method +': '+req.url);
    var options = {
        root: __dirname + '/web/'
    };
    res.sendFile("index.html", options, function(err) {
        if (err) {throw err;}
    });
});

app.use(function(req, res, next) {
    console.log(req.method +': '+req.url);
    express.static('web')(req,res,next);
});
var port = 5000;
app.listen(port, function() {
    console.log("Server now listening on port "+port+".");
});
