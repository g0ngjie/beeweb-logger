"use strict";

const Sequelize = require("sequelize");
const MysqlDB = require("../utils/mysqlDB");

const LoggerModel = MysqlDB.define("loggers", {
  traceId: Sequelize.STRING,
  eventType: Sequelize.STRING,
  stateType: Sequelize.STRING,
  pageStatus: Sequelize.STRING,
  stayTime: Sequelize.STRING,
  createTime: Sequelize.STRING,
  statement: Sequelize.STRING,
  content: Sequelize.STRING,
  url: Sequelize.STRING,
  address: Sequelize.STRING,
  province: Sequelize.STRING,
  city: Sequelize.STRING,
  lat: Sequelize.STRING,
  lng: Sequelize.STRING,
  os: Sequelize.STRING,
});

LoggerModel.sync();
module.exports = LoggerModel;
