/**
 * Created by bournewang on 16/9/8.
 */
'use strict';


const mongoose = require('mongoose');
const path = require('path');
const CommonError = require(path.resolve('./config/error/CommonError'));
const logger = require(path.resolve('./config/lib/logger'));
const CheckCode = mongoose.model('CheckCode');
const str_md5 = require('../common/MD5Util').str_md5;
const random = require('random-js')();
const config = require(path.resolve('./config/config'));
const captcha = config.captcha;

exports.create = create;
exports.check = check;

function create(req, res) {
    let randomStr = random.string(8, captcha.alphabet);
    let encryption_base = captcha.key + randomStr;
    // encryption_base += ':' + encodeURI(captcha.alphabet) + ':' + captcha.letters;
    let md5 = str_md5(encryption_base);
    let password = '';
    for (var i = 0; i < captcha.letters; i++) {
        let index = md5.charCodeAt(i) % captcha.alphabet.length;
        password += captcha.alphabet.charAt(index);
    }
    logger.info('password ================== ' + password);
    let checkCode = new CheckCode({code: password, salt: randomStr});
    checkCode.validTime = new Date(new Date().getTime() + captcha.delayTime);
    checkCode.save(function (err, obj) {
        if (err) {
            logger.error(err);
            res.end();
        } else {
            req.session.codeId = obj._id;
            res.json({imgUrl: captcha.captchaBaseUrl + '?client=' + captcha.client + '&random=' + randomStr});
        }
    });
}

function check(req, res) {
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
}
