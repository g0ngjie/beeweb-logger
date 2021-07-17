const fs = require("fs");

/**
 * date format
 * @returns
 */
function getDateObj() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const ymd = `${year}-${month}-${day}`;
  return {
    full: `${ymd} ${hour}:${minute}:${second}`,
    ymd
  };
}

/**
 * log
 * @param {Object} log
 */
exports.logInfo = log => {
  const _now = getDateObj().full;
  const log_file = getDateObj().ymd + "-log";
  const _strJson = `${_now} >> ${JSON.stringify(log)}\n`;
  fs.appendFile(`./logs/${log_file}`, _strJson, err => {
    if (!err) console.log(">> :: insert logs ::");
  });
};
