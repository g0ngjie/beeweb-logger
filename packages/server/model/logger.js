"use strict";

const Sequelize = require("sequelize");
const MysqlDB = require("../utils/mysqlDB");

/**
 * @class MemberModel
 * @property {String} userId 操作人ID
 * @property {String} deptId 部门id
 * @property {String} deptName 部门名称
 * @property {String} month 截至月
 * @property {String} day 截至日
 * @property {String} expirationTs 截至日期时间戳
 */
const LoggerModel = MysqlDB.define("loggers", {
  userId: Sequelize.STRING,
  deptId: Sequelize.STRING,
  deptName: Sequelize.STRING,
  memberTotal: Sequelize.INTEGER,
  month: Sequelize.STRING,
  day: Sequelize.STRING,
  expirationTs: Sequelize.STRING,
});

LoggerModel.sync();
module.exports = LoggerModel;
