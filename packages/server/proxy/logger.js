"use strict";

const LoggerModel = require("../model/logger");
const { object, date } = require('@alrale/common-lib');
const seq = require("sequelize");
const Op = seq.Op;

exports.create = async (data) => {
    if (!data || object.isEmpty(data))
        throw new TypeError('data is Nil')
    const result = await LoggerModel.create(data);
    return result;
};

exports.count = async (search) => {
    return await LoggerModel.count(search);
};

exports.findAll = async (search) => {
    const result = await LoggerModel.findAll(search);
    return result;
};

/**查询当天数据 */
exports.findToday = async () => {
    const ymd = date.formatDate(new Date(), 'yyyy-MM-dd')
    const result = await LoggerModel.findAll({
        where: { createTime: { [Op.like]: `${ymd}%` } },
        order: [["createdAt", "DESC"]]
    })
    return result;
}

exports.findOne = async (search) => {
    const result = await LoggerModel.findOne(search);
    return result;
};