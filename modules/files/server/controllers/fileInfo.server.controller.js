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
const PaginationUtil = require(path.resolve('./modules/core/server/common/PaginationUtil'));


exports.list = function (req, res) {
    PaginationUtil.query(req, res, FileInfo);
};
