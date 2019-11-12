const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const config = require(__dirname + "/../config/config.js")[env];
const basename = path.basename(__filename);

const dotenv = require("dotenv");
dotenv.config();

console.log("this is the environment: ", env);

const db = {};

//

let sequelize;
// change to prod
if (env === "development") {
  console.log(process.env.DATABASE);
  sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,
    {
      logging: false,
      host: process.env.HOST,
      port: process.env.PORT,
      dialect: "postgres",
      dialectOption: {
        ssl: true,
        native: true
      }
    }
  );
} else {
  console.log(" else ssss");
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const models = {
  User: sequelize.import("./Users").User,
  Profile: sequelize.import("./Users").Profile
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.models = models;

module.exports = db;
