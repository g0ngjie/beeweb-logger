const schedule = require("node-schedule");
const { Base64 } = require("./secret");
const { setMail, getHtmlTemplate } = require("./mail");
const { logInfo } = require("./logs");
const { timing, minute, hour } = require("../config");
const logProxy = require("../proxy/logger");
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
  const {
    address: userAddr = {},
    statement,
    content: getContent,
    ...others
  } = JSON.parse(decodeStr);

  let addr = {};
  // 使用ip.io
  if (userAddr.ip) {
    const { latitude, longitude, region, city } = userAddr;
    addr = {
      lat: latitude,
      lng: longitude,
      province: region,
      city,
      address: `${region} | ${city}`,
    };
  } else {
    // 百度地图
    const { lat, lng, location: data = {} } = userAddr;
    const { content = {} } = data;
    const { address: _address, address_detail = {} } = content;
    const { province, city } = address_detail;
    addr = {
      lat,
      lng,
      province,
      city,
      address: _address,
    };
  }
  return {
    ...addr,
    statement: JSON.stringify(statement),
    content:
      typeIs(getContent) === "object" ? JSON.stringify(getContent) : getContent,
    ...others,
  };
}

/**
 * add cache
 * @param {Object} data
 */
exports.addCache = (data) => {
  const _data = data;
  const { lat, lng } = _data;
  const _id = `${lat}_${lng}`;
  const exist = cache[_id];
  if (exist) {
    const { count } = exist;
    cache[_id] = { ...exist, count: count + 1 };
  } else {
    cache[_id] = { ..._data, count: 1 };
  }
  // 日志
  // logInfo(_data);
};

/**插入数据 */
exports.insertData = (data) => {
  // 缓存
  const _data = fmtData(data);
  exports.addCache(_data);
  logProxy.create(_data);
};
