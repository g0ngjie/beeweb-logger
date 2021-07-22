"use strict";

const Sequelize = require("sequelize");
const { DB_URL, DB_NAME, DB_USER, DB_PASS } = require("./../config");

const DB = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_URL,
    dialect: "mysql",
    query: { raw: true },
    pool: {
        acquire: 30000, //请求超时时间
        max: 5, // 连接池最大连接数量
        min: 0, // 连接池最小连接数量
        idle: 10000, // 如果一个线程超过10秒钟没有被使用过就释放该线程
    },
});

module.exports = DB;
