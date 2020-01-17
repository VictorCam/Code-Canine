const Sequelize = require("Sequelize");
const db = require("../db");

module.exports = db.sequelize.define(
  "mysampletables",
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
    }
  },
  {
    timestamps: false
  }
);
