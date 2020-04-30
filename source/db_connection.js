const mysql = require('mysql');

const connectsql = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: '',
  database: "test"
});

connectsql.connect(function(err) {
  if(err) {
    console.log("error");
  }
  else {
  console.log("successfully connected!");
  }
});

module.exports = connectsql;