const schedule = require("node-schedule");
const { Base64 } = require("./secret");
const { setMail, getHtmlTemplate } = require("./mail");
const { logInfo } = require("./logs");
const { timing, minute, hour } = require("../config");
const logProxy = require('../proxy/logger');
const { typeIs } = require("@alrale/common-lib");

let cache = {};

/**
 * exec schedule
 */
function execSchedule() {
  schedule.scheduleJob(`1 ${minute} ${hour} * * *`, () => {
    launchMail();
  });
}

/* schedule dispatch */
exports.disptachSchedule = () => {
  if (timing) execSchedule();
};

/**
 * schedule mail
 */
function launchMail() {
  const html = getHtmlTemplate(cache);
  setMail(html);
  cache = {};
}

/**
 * data format
 * @param {*} reqBody
 * @returns {Object}
 */
function fmtData(reqBody) {
  const decodeStr = Base64.decode(reqBody);
  const { navigatorInfo, address: userAddr = {}, statement, content: getContent, ...others } = JSON.parse(decodeStr);

  const {
    userAgent, //由客户机发送服务器的 user-agent 头部的值
    appName, //浏览器的名称
    appVersion, //浏览器的平台和版本信息
    platform, //运行浏览器的操作系统平台
  } = navigatorInfo;
  const { lat, lng, location: data = {} } = userAddr;
  const { address, content = {} } = data;
  const { address: _address, address_detail = {} } = content;
  const { province, city, district, street } = address_detail;
  return {
    userAgent,
    appName,
    appVersion,
    platform,
    lat,
    lng,
    address,
    _address,
    province,
    city,
    district,
    street,
    statement: JSON.stringify(statement),
    content: typeIs(getContent) === 'object' ? JSON.stringify(getContent) : getContent,
    ...others
  };
}

/**
 * add cache
 * @param {Object} data
 */
exports.addCache = (data) => {
  const _data = fmtData(data);
  const { platform, lat, lng, userAgent } = _data;
  const _id = `${platform}_${lat}_${lng}_${userAgent}`;
  const exist = cache[_id];
  if (exist) {
    const { count } = exist;
    cache[_id] = { ...exist, count: count + 1 };
  } else {
    cache[_id] = { ..._data, count: 1 };
  }
  // 日志
  // logInfo(_data);
  if (!timing) launchMail();
};

/**插入数据 */
exports.insertData = (data) => {
  // 缓存
  exports.addCache(data)
  const _data = fmtData(data);
  logProxy.create(_data)
}