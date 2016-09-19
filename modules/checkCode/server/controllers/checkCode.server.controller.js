/**
 * Created by bournewang on 16/9/8.
 */
'use strict';


const mongoose = require('mongoose');
const path = require('path');
const CommonError = require(path.resolve('./config/error/CommonError'));
const logger = require(path.resolve('./config/lib/logger'));
const ccap = require('ccap');
const CheckCode = mongoose.model('CheckCode');
const gm = require('gm');
const DELAY_TIME = 5 * 60 * 1000;
const IMG_TYPE = 'bmp';

exports.create = function (req, res) {
    let captcha = ccap();
    let ary = captcha.get();
    let checkCode = new CheckCode({code: ary[0]});
    checkCode.validTime = new Date(new Date().getTime() + DELAY_TIME);
    checkCode.save(function (err, obj) {
        if (err) {
            logger.error(err);
            res.end();
        } else {
            req.session.codeId = obj._id;
            // res.set(headerCode, obj._id);
            res.type(IMG_TYPE);
            // res.cookie(CODE, obj._id);
            res.end(ary[1]);
        }
    });
};

exports.check = function (req, res) {
    if (req.body) {
        let checkCode = req.body;
        CheckCode.findById(checkCode._id, function (err, obj) {
            if (err) {
                logger.error(err);
                throw new CommonError('系统错误');
            } else if (obj) {
                if (obj.check(checkCode.code)) {
                    res.end();
                } else {
                    throw new CommonError('验证码错误');
                }
            } else {
                throw new CommonError('验证码错误');
            }
        });
    } else {
        throw new CommonError('验证码错误');
    }
};
