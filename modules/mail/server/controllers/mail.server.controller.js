/**
 * Created by bournewang on 16/8/12.
 */
'use strict';

const path = require('path');
const CommonError = require(path.resolve('./config/error/CommonError'));
const logger = require(path.resolve('./config/lib/logger'));
const mongoose = require('mongoose');
const client = require(path.resolve('./config/lib/stomp'));
const MailInfo = mongoose.model('MailInfo');
const MQ_NAME = require('../receivers/mailDealer.server.receiver').MQName;
const MailStatus = require('../models/mail.server.model').MailStatus;

exports.send = send;

function send(req, res) {
    let mail = req.body;
    if (mail && mail.receivers && mail.content) {
        let mailInfo = new MailInfo(mail);
        mailInfo.save(function (err, obj) {
            if (err) {
                throw err;
            } else {
                let msg = {};
                msg.mailId = mailInfo._id;
                client.publish(MQ_NAME, msg, function (err) {
                    if (err) {
                        logger.error(err);
                        obj.update({status: MailStatus.FAIL, remarks: [err]}, function (err) {
                            if (err) {
                                logger.error(err);
                            }
                            throw new CommonError('发送失败');
                        });
                    } else {
                        res.json(obj);
                    }
                });
            }
        });
    } else {
        throw new CommonError('收件人或邮件内容不能为空');
    }

}
