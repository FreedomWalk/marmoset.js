'use strict';


const WechatAPI = require('wechat-api');
const config = require('../config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let wechatToken = new Schema({}, {strict: false});
let WechatToken = mongoose.model('WechatToken', wechatToken);

let api = new WechatAPI(config.wechat.appid, config.wechat.appsecret, function (callback) {
  WechatToken.findOne({}).sort('-created').exec(function (err, obj) {
    if (err) {
      return callback(err);
    }
    callback(null, obj);
  });
}, function (token, callback) {
  let nToken = new WechatToken(token);
  nToken.save(function (err, obj) {
    if (err) {
      return callback(err);
    }
    callback(null, obj);
  });
  // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
});

module.exports = api;
