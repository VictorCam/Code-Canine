const Sequelize = require("Sequelize");
const db = require("../db");

module.exports = db.sequelize.define( 
  "user_table", //database table goes here (appends s sometimes)
  {
    ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: Sequelize.STRING
    },
    Password: {
      type: Sequelize.STRING
    },
    icon: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);
