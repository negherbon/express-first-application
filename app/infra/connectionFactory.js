var mysql = require('mysql');

function createDbConnection() {
  return mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'root',
   database: 'nodejs_with_express'
 });
}

//wrapper
module.exports = function(){
  return createDbConnection;
};
