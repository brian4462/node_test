var mysql = require('mysql2');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'kim25134460*',
  database : 'opentutorials'
});
db.connect();
module.exports = db;
