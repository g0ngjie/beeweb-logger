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

exports.getHtml = (label, content) => {
  let _html = `<div style="width: 100%; margin: 5px;display: flex;">
      <div style="margin: 5px;">
      <strong style="color: #666;font-size: 15px;">${label}</strong>`;
  if (content) {
    _html += `<span
      style="border: 1px solid #d9ecff;
      box-sizing: border-box;
      margin: 5px;
      color: #409eff;
      background-color: #ecf5ff;
      display: inline-block;
      padding: 0 10px;
      line-height: 30px;
      font-size: 12px; 
      border-radius: 5px;"
    >${content}</span>`;
  }
  _html += `</div></div>`;
  return _html;
};
