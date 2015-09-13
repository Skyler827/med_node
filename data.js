var pg = require('pg');
var fs = require('fs-promise');
var database_ref = "postgres://audittool:password@localhost/med_node";

var self = {};

self.run_query = function (o) {
    return new Promise(function(resolve, reject) {
        pg.connect(database_ref, function (err, client, done) {
            if (err) {
                reject(err);
            } else {
                var query;
                if (o.values) {
                    query = client.query(o.sql, o.values);
                } else {
                    query = client.query(o.sql);
                }
                query.on('row', function(row, result) {
                    if (o.onrow) {
                        o.onrow(row, result);
                    } else {
                        result.addRow(row);
                    }
                });
                query.on('end', function(result) {
                    done();
                    resolve(result);
                });
                query.on('error', function(err2) {
                    console.log("<db_lib:38>");
                    console.log(err2);
                    console.log(o.sql);
                    if (o.values) {
                        console.log(o.values.slice(0,20));
                        console.log("("+o.values.length+" parameters, up to 20 shown)");
                    }
                    console.log("</db_lib:38>");
                    reject(err2);
                });
            }
        });
    });
};

self.execute_sql_file = function (filename) {
    return new Promise(function(resolve, reject) {
        var filePath = __dirname+'/'+filename;
        console.log("reading file: "+filePath);
        fs.readFile(filePath, 'utf8')
        .then(function(data) {
            console.log(data);
            var sql_statements = data.split(';');
            var evaluate_promise = function() {
                if (sql_statements.length == 0) {
                    return;
                } else {
                    return self.runquery({
                        sql:sql_statements.shift()
                    }).then(evaluate_promise);
                }
            };
            return evaluate_promise();
        }).catch(function(err){
            //console.log(err);
            reject(err);
            throw err;
        }).then(function(result) {
            resolve({
                statements: misc.indexes(sql_file_contents, ";").length,
                tables: misc.indexes(sql_file_contents, "CREATE TABLE").length
            });
        });
    });
};

module.exports = self;
