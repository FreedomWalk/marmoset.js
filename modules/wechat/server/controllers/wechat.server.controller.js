'use strict';


const path = require('path');
const wechatApi = require(path.resolve(
  './config/lib/wechat'));
const logger = require(path.resolve('./config/lib/logger'));


/**
 * 发送消息
 *
 * @param {any} req
 * @param {any} res
 */
exports.sendText = function (req, res) {
  let textBody = req.body;
  wechatApi.sendText(textBody.openid, textBody.content, function (err, result) {
    if (err) {
      logger.error(err);
      res.json(err);
    } else {
      logger.info(result);
      res.json(result);
    }
  });
};

exports.getFans = function (req, res) {
  wechatApi.getFollowers(function (err, result) {
    if (err) {
      logger.error(err);
      res.json(err);
    } else {
      logger.info(result);
      res.json(result);
    }
  });
};

exports.getUser = function (req, res) {
  let openId = req.params.openId;
  wechatApi.getUser(openId, function (err, result) {
    if (err) {
      logger.error(err);
      res.json(err);
    } else {
      logger.info(result);
      res.json(result);
    }
  });
};

exports.batchGetUser = function (req, res) {
  let openIds = [];
  try {
    openIds = JSON.parse(req.params.openIds);
  } catch (error) {
    logger.error(error);
    throw new Error('error format');
  }
  wechatApi.batchGetUsers(openIds, function (err, result) {
    if (err) {
      logger.error(err);
      res.json(err);
    } else {
      logger.info(result);
      res.json(result);
    }
  });
};
