var express = require('express');
var fs = require('fs');
var lib = require('./app_lib');


var app = express();

app.get('/', function(req, res) {
    console.log(req.body);
    console.log(req.method);
    console.log("got a request");
    var options = {
        root: __dirname + '/web/'
    };
    res.sendFile("index.html", options, function(err) {
        //the request has been responded to
        // there may or may not be an error
        if (err) {
            throw err;
        } else {
            console.log("all good!");
        }
    });
});

app.use(express.static('web'));
var port = 5000;
app.listen(port, function() {
    console.log("Server now listening on port "+port+".");
});
/*
app.use(function(req,res,next) {
    var s = "handling request: "+req.method+' '+req.originalUrl +
        ' ('+new Date().toUTCString()+')';
    console.log(s);
    express.static('web')(req,res,next);
});
*/
