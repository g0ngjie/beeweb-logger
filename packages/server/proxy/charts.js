"use strict";

const LoggerModel = require("../model/logger");
const seq = require("sequelize");

/**查询访问的城市列表 */
exports.findCitys = async () => {
    const result = await LoggerModel.findAll({
        attributes: [
            'city',
            'traceId',
            'lat',
            'lng',
            [seq.fn('count', seq.col('id')), 'count']
        ],
        group: ['city'],
    })
    return result;
}
