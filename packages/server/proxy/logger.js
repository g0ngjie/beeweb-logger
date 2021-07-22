"use strict";

const LoggerModel = require("../model/logger");
const { object } = require('@alrale/common-lib');

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

exports.findOne = async (search) => {
    const result = await LoggerModel.findOne(search);
    return result;
};