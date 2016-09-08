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
            res.set('checkCode', ary[0]);
            res.end(ary[1]);
        }
    });
};