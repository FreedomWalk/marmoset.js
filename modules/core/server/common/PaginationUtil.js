/**
 * Created by bournewang on 16/9/13.
 */
'use strict';

const path = require('path');
const CommonError = require(path.resolve('./config/error/CommonError'));
const logger = require(path.resolve('./config/lib/logger'));
const JSONUtils = require(path.resolve('./modules/core/server/common/JSONUtils'));

function query(req, res, model) {
    let size = parseInt(req.params.pageSize, 0);
    let pageSize = size > 0 ? size : 5;
    let pageNum = parseInt(req.params.pageNum, 0);
    let queryString = req.params.queryString;
    let queryObj = {};
    try {
        queryObj = JSONUtils.parse(queryString);
    } catch (error) {
        logger.error(error);
    }
    model.findPagination(queryObj.query, queryObj.sort, pageSize, pageNum).then(
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
}

exports.query = query;
