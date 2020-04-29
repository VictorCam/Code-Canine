const Sequelize = require("Sequelize");
const db = require("../db");

module.exports = db.sequelize.define(
  "user_art",
  {
    ID: {
      type: Sequelize.INTEGER
    },
    art_sub: {
      type: Sequelize.BLOB
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);
