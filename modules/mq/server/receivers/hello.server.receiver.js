/**
 * Created by bournewang on 16/8/10.
 */
'use strict';

const path = require('path');
const logger = require(path.resolve('./config/lib/logger'));
const mqName = require(path.resolve('./modules/mq/server/common/mq.server.common.name.js'));

exports.dealMessage = function (msg) {
  logger.info(msg);
};

exports.MQName = mqName.HELLO;
