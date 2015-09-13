var express = require('express');
var fs = require('fs-promise');
var db = require('./data.js');

var app = express();

var number_of_specialties = 0;
// refresh db
db.execute_sql_file("create_tables.sql")
.catch(function(err) {
    throw err;
})

app.get('/', function(req, res) {
    console.log(req.method +': '+req.url);
    var options = {
        root: __dirname + '/web/'
    };
    res.sendFile("index.html", options, function(err) {
        if (err) {throw err;}
    });
});
app.use("/login", function(req, res) {
    console.log("login?");
    // check to see if the user
    db.run_query({
        sql:"SELECT * FROM specialty;"
        })
    .then(function(result) {
        res.send(result);
        result.rows.forEach(function(i) {
            console.log(i);
        });
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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function get_random_element (list) {
    console.log()
    return list[getRandomInt(0, list.length)];
};
