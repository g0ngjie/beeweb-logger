const nodemailer = require("nodemailer");
const { logInfo } = require("./logs");
const { sendMailTo } = require("../config");

exports.setMail = async html => {
  let mailTransport = nodemailer.createTransport({
    service: "qq",
    secure: true, //安全方式发送,建议都加上
    auth: {
      user: "514979324@qq.com",
      pass: "tnnomaruubodbgcd"
    }
  });
  let options = {
    from: "514979324@qq.com",
    to: sendMailTo,
    bcc: "密送",
    subject: "Gj Loggers",
    html
  };
  mailTransport.sendMail(options, function (err, msg) {
    if (err) {
      console.log(err);
    } else {
      console.log("success");
      logInfo("sendMail success");
    }
  });
};

/**获取Html模版 */
exports.getHtmlTemplate = (rowsMap = {}) => {
  let template = ''
  let total = 0;
  for (const _id in rowsMap) {
    if (Object.hasOwnProperty.call(rowsMap, _id)) {
      const rows = rowsMap[_id] || {};
      const { count } = rows
      total += count
      // 容器
      template += '<div style="padding-bottom: 5px; border-bottom: 1px #ecf5ff solid;">'
      for (const label in rows) {
        if (Object.hasOwnProperty.call(rows, label)) {
          let content = rows[label];
          if (label === 'statement') content = JSON.stringify(content)
          template += `
          <div style="width: 100%; margin: 1px;word-wrap:break-word;word-break:normal;">
            <div style="
                border: 1px solid #d9ecff;
                color: #409eff;
                background-color: #ecf5ff;
                padding: 0 10px;
                line-height: 23px;
                font-size: 12px; 
                border-radius: 5px;">
                <span style="color: #666;font-size: 13px;font-weight: bold;width: 90px;display: inline-block;">${label}</span>
                <span>${content || '_'}</span>
            </div>
          </div>
          `;
        }
      }
      template += '</div>'
    }
  }

  template += `<strong style="margin: 10px;color:#F56C6C;font-size: 12px;">总访问量：${total}</strong>`;
  return template
};
