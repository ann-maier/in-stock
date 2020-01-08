const Sequelize = require("sequelize");

module.exports = new Sequelize("store", "root", "54906", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false
  }
});
