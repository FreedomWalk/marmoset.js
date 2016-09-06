/**
 * Created by bournewang on 16/8/12.
 */
'use strict';

const nodemailer = require('nodemailer');
const config = require('../config');
const q = require('q');

let sendMail = function (mailOptions) {
  let transporter = nodemailer.createTransport(config.email.smtpServer);
  let defer = q.defer();
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      defer.reject(error);
    } else {
      defer.resolve(error);
    }
  });
  return defer.promise;
};

exports.sendMsg = function (receivers, subject, msg) {
  let mailOptions = {
    from: config.email.from,
    to: receivers,
    subject: subject,
    text: msg
  };
  return sendMail(mailOptions);
};

exports.sendHtml = function (receivers, subject, msg) {
  let mailOptions = {
    from: config.email.from,
    to: receivers,
    subject: subject,
    html: msg
  };
  return sendMail(mailOptions);
};
