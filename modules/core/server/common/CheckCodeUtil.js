/**
 * Created by bournewang on 16/9/12.
 */
'use strict';
const path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    config = require(path.resolve('./config/config')),
    logger = require(path.resolve('./config/lib/logger'));
const CheckCode = mongoose.model('CheckCode');
const CommonError = require(path.resolve('./config/error/CommonError'));

function check(codeId, code, callback) {
    CheckCode.findById(codeId, function (err, obj) {
        if (err) {
            logger.error(err);
            callback(new CommonError('系统错误'));
        } else if (obj) {
            obj.check(code).then(function () {
                callback();
            }, function (err) {
                if (err instanceof CommonError) {
                    callback(err);
                } else {
                    callback(new CommonError('验证码错误'));
                }
            });
        } else {
            callback(new CommonError('验证码错误'));
        }
    });
}

exports.check = check;
