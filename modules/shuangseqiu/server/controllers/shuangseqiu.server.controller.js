/**
 * Created by pulin on 16/8/16.
 */
'use strict';

const path = require('path');
const mongoose = require('mongoose');
const Shuangseqiu = mongoose.model('Shuangseqiu');
const CommonError = require(path.resolve('./config/error/CommonError'));
const PaginationUtil = require(path.resolve('./modules/core/server/common/PaginationUtil'));

exports.create = function (req, res) {

    let shuangseqiu = new Shuangseqiu(req.body);
    shuangseqiu.save(function (err) {
        if (err) {
            throw new Error(err);
        } else {
            res.json(shuangseqiu);
        }
    });

};

/**
 * List of schedules
 */
exports.list = function (req, res) {
    let size = parseInt(req.params.pageSize, 0);
    let pageSize = size > 0 ? size : 5;
    let pageNum = parseInt(req.params.pageNum, 0);
    Shuangseqiu.findPagination({}, '-created', pageSize, pageNum).then(
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
