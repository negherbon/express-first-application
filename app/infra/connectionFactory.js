var mysql = require('mysql');

function createDbConnection() {

  if (!process.env.NODE_ENV)
    return mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'root',
     database: 'nodejs_with_express'
   });

   if (process.env.NODE_ENV === 'test')
     return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'nodejs_with_express_test'
    });

}

//wrapper
module.exports = function(){
  return createDbConnection;
};
