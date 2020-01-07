const Sequelize = require("Sequelize");
const db = require("./db.js");

module.exports = db.sequelize.define(
  "mysampletables",
  {
    ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: Sequelize.TEXT
    }
  },
  {
    timestamps: false
  }
);
