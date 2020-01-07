const Sequelize = require("Sequelize");
const db = {};

const sequelize = new Sequelize("sampleDB", "root", "", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: 0
});

sequelize
  .authenticate()
  .then(function() {
    console.log("success");
  })
  .catch(function(error) {
    console.log("error: " + error);
  });

db.sequelize = sequelize;

module.exports = db;
