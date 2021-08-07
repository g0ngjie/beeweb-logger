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
exports.findToday = async (search) => {
    const ymd = date.formatDate(new Date(), 'yyyy-MM-dd')
    const where = {};
    const {
        traceId,
        eventType,
        stateType,
        pageStatus,
        address,
    } = search;
    if (traceId) where.traceId = { [Op.like]: `%${traceId}%` };;
    if (eventType) where.eventType = { [Op.like]: `%${eventType}%` };
    if (stateType) where.stateType = { [Op.like]: `%${stateType}%` };
    if (pageStatus) where.pageStatus = { [Op.like]: `%${pageStatus}%` };
    if (address) where.address = { [Op.like]: `%${address}%` };
    where.createTime = { [Op.like]: `${ymd}%` }
    const result = await LoggerModel.findAll({
        where,
        order: [["createdAt", "DESC"]]
    })
    return result;
}

/**查询当天访问的城市列表 */
exports.findTodayCitys = async () => {
    const ymd = date.formatDate(new Date(), 'yyyy-MM-dd')
    const result = await LoggerModel.findAll({
        where: { createTime: { [Op.like]: `${ymd}%` } },
        attributes: [
            ['_address', 'address'],
            'city',
            'traceId',
            [seq.fn('count', seq.col('id')), 'count']
        ],
        group: ['_address', 'city', 'traceId'],
    })
    return result;
}

exports.findOne = async (search) => {
    const result = await LoggerModel.findOne(search);
    return result;
};