var express = require('express');
var fs = require('fs-promise');
var db = require('./data.js');

var app = express();

var number_of_specialties = 0;
// refresh db
db.execute_sql_file("dropdb.sql")
.then(db.execute_sql_file("create_tables.sql"))
.then(function() {
    return fs.readFile('./data/specialties.csv')
    .then(function(file_text) {
        var lines = file_text.split('\n');
        var vals = [];
        for (var i=0; i<lines.length; i++) {
            vals.push(lines[i].split('\t').join(', '));
        }
        var ans = vals.join('), (');
        number_of_specialties = ans.length;
        return {
            sql:"INSERT INTO specialty (name, description) "+
                "VALUES ("+ans+");"
        }
    })
    .then(db.run_query);
})
.then(Promise.all([
    fs.readFile('./data/CSV_Database_of_First_Names.csv'),
    fs.readFile('./data/CSV_Database_of_Last_Names.csv')
]))
.then(function(results) {
    var firstnames = results[0];
    var lastnames = results[1];
    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    var get_random_first_name = function() {
        return firstnames[getRandomInt(0, firstnames.length)];
    };
    var get_random_last_name = function() {
        return lastnames[getRandomInt(0, lastnames.length)];
    };
    //generate physicians
    var number_of_physicians = 60;
    var physicians = [];
    for (var i=0; i<number_of_physicians; i++) {
        var fn = get_random_first_name()
        var ln = get_random_last_name()
        var p = {
            firstname: fn,
            lastname: ln,
            username: fn+ln,
            email: fn+ln+'@hospital.com',
            password: 'hunter2'
        };
        physicians.push(['Physician',p.firstname,p.lastname,
            p.username,p.email,p.password].join(','));
    }

    return db.run_query({
        sql:"INSERT INTO _user (type, firstname, lastname, username, email, password) "+
            "VALUES ("+physicians.join('), (')+') '+
            "RETURNING id"
    });

});
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
    db.run_query({sql:"SELECT * FROM _user;"})
    .then(function(result) {
        res.send(result);
        console.log(result);
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
