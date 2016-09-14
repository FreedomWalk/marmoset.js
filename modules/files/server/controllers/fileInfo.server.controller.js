/**
 * Created by bournewang on 16/8/8.
 */
'use strict';

const mongoose = require('mongoose');
const db = mongoose.connection.db;
const mongo = mongoose.mongo;
const path = require('path');
const logger = require(path.resolve('./config/lib/logger'));
const FileInfo = mongoose.model('FileInfo');
const base64 = require('js-base64').Base64;
const CommonError = require(path.resolve('./config/error/CommonError'));
const PaginationUtil = require(path.resolve('./modules/core/server/common/PaginationUtil'));
const grid = require('gridfs-stream');
const ObjectId = mongoose.Types.ObjectId;

const gridfs = grid(db, mongo);

function list(req, res) {
    PaginationUtil.query(req, res, FileInfo);
}

/**
 * 删除文件
 * @param req
 * @param res
 */
function remove(req, res) {
    let fileId = req.params.fileId;
    FileInfo.findById(fileId, function (err1, fileInfo) {
        errorDeal(err1);
        fileInfo.remove(function (err2, obj) {
            errorDeal(err2);
            gridfs.remove({_id: new ObjectId(obj.gridFSId)}, function (err3) {
                if (err3) {
                    obj.save(function (err4) {
                        errorDeal(err4);
                        logger.error(err3);
                        throw err3;
                    });
                } else {
                    res.end();
                }
            });
        });
    });
}

function errorDeal(err) {
    if (err) {
        logger.error(err);
        throw err;
    }
}

exports.list = list;
exports.remove = remove;
