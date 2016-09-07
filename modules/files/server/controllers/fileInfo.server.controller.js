/**
 * Created by bournewang on 16/8/8.
 */
'use strict';

const mongoose = require('mongoose');
const path = require('path');
const logger = require(path.resolve('./config/lib/logger'));
const FileInfo = mongoose.model('FileInfo');
const base64 = require('js-base64').Base64;
const CommonError = require(path.resolve('./config/error/CommonError'));

exports.list = function (req, res) {
  let size = parseInt(req.params.pageSize, 0);
  let pageSize = size > 0 ? size : 5;
  let pageNum = parseInt(req.params.pageNum, 0);
  let queryString = req.params.queryString;
  let queryObj = JSON.parse(base64.decode(queryString));
  FileInfo.findPagination(queryObj.query, queryObj.sort, pageSize, pageNum).then(
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
