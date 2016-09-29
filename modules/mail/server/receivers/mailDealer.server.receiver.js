/**
 * Created by bournewang on 2016/9/28.
 */
'use strict';

const path = require('path');
const logger = require(path.resolve('./config/lib/logger'));
const mongoose = require('mongoose');
const MailInfo = mongoose.model('MailInfo');
const smtpSender = require(path.resolve('./config/lib/smtp'));
const MailStatus = require('../models/mail.server.model').MailStatus;
const MailType = require('../models/mail.server.model').MailType;

exports.dealMessage = dealMessage;
exports.MQName = 'MAIL_DEALER';

function dealMessage(msg) {
    let mailId = msg.mailId;
    MailInfo.findById(mailId, function (err, mailInfo) {
        if (mailInfo.type === MailType.HTML) {
            smtpSender.sendHtml(mailInfo.receivers, mailInfo.subject, mailInfo.content).then(function () {
                update(mailInfo, {status: MailStatus.SUCCESS});
            }, function (err) {
                logger.error(err);
                update(mailInfo, {status: MailStatus.FAIL, remarks: [err]});
            });
        } else {
            smtpSender.sendMsg(mailInfo.receivers, mailInfo.subject, mailInfo.content).then(function () {
                update(mailInfo, {status: MailStatus.SUCCESS});
            }, function (err) {
                logger.error(err);
                update(mailInfo, {status: MailStatus.FAIL, remarks: [err]});
            });
        }

    });

    function update(mailInfo, updateObj) {
        mailInfo.update(updateObj, function (err) {
            if (err) {
                logger.error(err);
            }
        });
    }
}
