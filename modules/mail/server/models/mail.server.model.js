/**
 * Created by bournewang on 2016/9/27.
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MailType = {TEXT: 'TEXT', HTML: 'HTML'};
const MailTypeEnum = [MailType.TEXT, MailType.HTML];

const MailStatus = {SUCCESS: 'SUCCESS', FAIL: 'FAIL', NEW: 'NEW'};
const MailStatusEnum = [MailStatus.SUCCESS, MailStatus.FAIL, MailStatus.NEW];

let MailInfo = new Schema({
    content: String,
    subject: String,
    sender: {
        type: String,
        required: 'Please input sender'
    },
    receivers: {
        type: [String],
        required: 'Please input receivers'
    },
    attachment: [String],
    type: {
        type: String,
        enum: MailTypeEnum,
        default: MailType.TEXT
    },
    status: {
        type: String,
        enum: MailStatusEnum,
        default: MailStatus.NEW
    },
    remarks: [String]
});

mongoose.model('MailInfo', MailInfo);

exports.MailStatus = MailStatus;
exports.MailType = MailType;
