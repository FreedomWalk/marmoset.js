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


exports.create = function (req, res) {
    let captcha;
    if (req.body) {
        let size = req.body;
        captcha = ccap(size.width, size.height);
    } else {
        captcha = ccap();
    }
    let ary = captcha.get();
    let checkCode = new CheckCode({code: ary[0]});
    checkCode.save(function (err, obj) {
        if (err) {
            logger.error(err);
            res.end();
        } else {
            res.set('checkCode', obj._id);
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