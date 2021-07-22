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
  browser: Sequelize.STRING,
  url: Sequelize.STRING,
  _address: Sequelize.STRING,
  city: Sequelize.STRING,
  address: Sequelize.STRING,
  province: Sequelize.STRING,
  district: Sequelize.STRING,
  street: Sequelize.STRING,
  lat: Sequelize.STRING,
  lng: Sequelize.STRING,
  userAgent: Sequelize.STRING,
  appName: Sequelize.STRING,
  appVersion: Sequelize.STRING,
  platform: Sequelize.STRING,
});

LoggerModel.sync();
module.exports = LoggerModel;
