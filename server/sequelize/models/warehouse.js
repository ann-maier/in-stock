const Sequelize = require("sequelize");

const db = require("../index");

module.exports = db.define("warehouse", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
