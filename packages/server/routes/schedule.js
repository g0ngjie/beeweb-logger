const schedule = require("node-schedule");
const { Base64 } = require("./secret");
const { setMail, getHtml } = require("./mail");
const { logInfo } = require("./logs");
const { timing, minute, hour } = require("./config");

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
async function launchMail() {
  let htmlList = "";
  let _count = 0;
  for (const key in cache) {
    if (cache.hasOwnProperty(key)) {
      const item = cache[key];
      const { count } = item;
      _count += count;
      for (const label in item) {
        if (item.hasOwnProperty(label)) {
          const content = item[label];
          htmlList += getHtml(label, content);
        }
      }
    }
  }
  if (htmlList) {
    htmlList += `<div style="margin: 10px; color: #F56C6C; font-weight: bold;">总访问量：${_count}</div>`;
    await setMail(htmlList);
  }
  cache = {};
}

/**
 * data format
 * @param {*} reqBody
 * @returns {Object}
 */
function fmtData(reqBody) {
  const decodeStr = Base64.decode(reqBody);
  const { navigatorInfo, address: userAddr = {}, ...others } = JSON.parse(decodeStr);
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
    ...others
  };
}

/**
 * add cache
 * @param {Object} data
 */
exports.addCache = async (data) => {
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
  logInfo(_data);
  if (!timing) await launchMail();
};
