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
.then(function() {
    return fs.readFile('./data/specialties.csv', 'utf8')
    .then(function(file_text) {
        var lines = file_text.split('\n');
        var vals = [];
        for (var i=0; i<lines.length; i++) {
            if (!lines[i].split('\t')[1]) {break;}
            vals.push(lines[i].split('\t')[0]);
            vals.push(lines[i].split('\t')[1]);
        }
        var ans = [];
        for (var i = 0; i< vals.length; i++) {
            if (i%2==0) {
                ans.push('($'+(i+1));
            } else {
                ans.push('$'+(i+1)+')');
            }
        }
        number_of_specialties = ans.length;
        return {
            sql:"INSERT INTO specialty (name, description) "+
                "VALUES "+ans.join(", ")+";",
            values:vals
        }
    })
    .then(db.run_query);
})
.then(function() {
    var firstnames = [];
    var lastnames = [];
    console.log(fs);
    console.log(fs.readFileSync('./data/CSV_Database_of_First_Names.csv', 'ascii'))
    return fs.readFile('./data/CSV_Database_of_Last_Names.csv', 'ascii')
    .then(function(results) {
        console.log("results2:");
        console.log(results);
        var get_random_last_name = function() {
            return lastnames[getRandomInt(0, lastnames.length)];
        };
        //generate physicians
        var number_of_physicians = 60;
        var physicians = [];
        for (var i=0; i<number_of_physicians; i++) {
            var fn = get_random_element(firstnames);
            var ln = get_random_element(lastnames);
            var list_to_add = ['\'Physician\'',fn,ln,fn+ln,fn+ln+'@hospital.com','hunter2'];
            physicians.push(list_to_add.join(','));
        }
        console.log("here?");
        return db.run_query({
            sql:"INSERT INTO _user (type, firstname, lastname, username, email, password) "+
                "VALUES ("+physicians.join('), (')+') '+
                "RETURNING id"
        });
    });
})
.catch(function(err) {throw err;});
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
