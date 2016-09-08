/**
 * Created by bournewang on 16/8/12.
 */
'use strict';

const path = require('path');
const smtpSender = require(path.resolve('./config/lib/smtp'));
const CommonError = require(path.resolve('./config/error/CommonError'));
const logger = require(path.resolve('./config/lib/logger'));

exports.send = function (req, res) {
  let mail = req.body;
  if (mail && mail.receivers && mail.msg) {
    let receivers = mail.receivers;
    let msg = mail.msg;
    let subject = mail.subject;
    smtpSender.sendMsg(receivers, subject, msg).then(function () {
      res.json(mail);
    }, function (err) {
      logger.error(err);
      throw new CommonError('发送失败，请稍后再试');
    });

  } else {
    throw new CommonError('收件人或邮件内容不能为空');
  }

};
