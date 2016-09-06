'use strict';

const path = require('path');
const mongoose = require('mongoose');
const ScheduleLog = mongoose.model('ScheduleLog');
const logger = require(path.resolve('./config/lib/logger'));
const CommonError = require(path.resolve('./config/error/CommonError'));

exports.list = function (req, res) {
  let size = parseInt(req.params.pageSize, 0);
  let pageSize = size > 0 ? size : 5;
  let pageNum = parseInt(req.params.pageNum, 0);
  ScheduleLog.findPagination({}, '-created', pageSize, pageNum).then(
    function (pagination) {
      res.json(pagination);
    },
    function (err) {
      logger.error(err);
      throw new CommonError('系统错误');
    }).catch(
    function (err) {
      logger.error(err);
      throw new CommonError('系统错误');
    });
};
