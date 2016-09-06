/**
 * Created by bournewang on 16/8/10.
 */
'use strict';

let path = require('path');
let logger = require(path.resolve('./config/lib/logger'));

exports.dealMessage = function (msg) {
  logger.info(msg);
};

exports.MQName = 'HELLO';
