/**
 * Created by bournewang on 16/8/8.
 */
'use strict';

const mongoose = require('mongoose');
const db = mongoose.connection.db;
const mongo = mongoose.mongo;
const grid = require('gridfs-stream');
const gridfs = grid(db, mongo);
const gridform = require('../common/gridform');
const path = require('path');
const CommonError = require(path.resolve('./config/error/CommonError'));
const fs = require('fs');
const logger = require(path.resolve('./config/lib/logger'));
const ObjectId = mongoose.Types.ObjectId;
const FileInfo = mongoose.model('FileInfo');
const DOT = '.';
const picType = 'pic';
var gm = require('gm');
gridform.db = db;
gridform.mongo = mongo;

let getOriginName = function (fileName) {
    let array = fileName.split(DOT);
    if (!array || array.length === 0) {
        throw new Error('没有文件名！');
    } else if (array.length === 1 || array.length === 2) {
        return array[0];
    } else {
        let originName = '';
        for (let i = 0; i < array.length - 1; i++) {
            originName += array[i] + DOT;
        }
        originName = originName.substring(0, originName.length - 1);
        return originName;
    }
};

let getSuffix = function (fileName) {
    let array = fileName.split(DOT);
    if (!array || array.length <= 1) {
        return 'undefined';
    } else {
        return array.pop().toLowerCase();
    }
};

exports.upload = function (req, res) {
    let form = gridform();
    form.parse(req, function (err, fields, files) {
        if (err) {
            throw err;
        }
        let file = files.file;
        gridfs.files.find({
            _id: new ObjectId(file.id)
        }).toArray(function (err, files) {
            if (err) {
                throw err;
            }
            if (!files || files.length === 0) {
                throw new CommonError('No found file');
            }
            let metadata = files[0];
            let fileInfo = new FileInfo();
            fileInfo.originName = getOriginName(file.name);
            fileInfo.suffix = getSuffix(file.name);
            fileInfo.fileSize = file.size;
            fileInfo.summary = fields.summary;
            fileInfo.md5 = metadata.md5;
            fileInfo.creator = req.user ? req.user.userId : 'guest';
            fileInfo.gridFSId = file.id;
            fileInfo.save(function (err, obj) {
                if (err) {
                    throw err;
                }
                res.json(obj);
            });
        });
    });
};

let getStream = function (req, res, fileType) {
    return new Promise(function (resolve) {
        let fileName = req.params.fileName;
        FileInfo.findById(new ObjectId(fileName), function (err, obj) {
            if (err) {
                throw err;
            }
            if (fileType && fileType !== obj.fileType) {
                throw new CommonError('文件类型不匹配!');
            }
            gridfs.files.find({
                _id: new ObjectId(obj.gridFSId)
            }).toArray(function (err, files) {
                if (err) {
                    throw err;
                }
                if (files && files.length === 0) {
                    throw new CommonError('No found file');
                }
                res.type(files[0].contentType);
                resolve(gridfs.createReadStream({
                    _id: obj.gridFSId
                }));
            });
        });
    });
};

exports.download = function (req, res) {
    getStream(req, res).then(function (stream) {
        stream.pipe(res);
    }).catch(function (err) {
        logger.error(err);
        throw new CommonError('下载失败');
    });
};

exports.picDownload = function (req, res) {
    getStream(req, res, picType).then(function (stream) {
        stream.pipe(res);
    }).catch(function (err) {
        logger.error(err);
        throw new CommonError('下载失败');
    });
};
/**
 * 缩放图片，if(force) 会强制缩放
 *
 * @param  {Number} width    宽
 * @param  {Number} height   高
 * @param  {Stream} inStream 输入流
 * @param  {Boolean} force    是否强制
 * @return {Stream}          流
 */
let resize = function (width, height, inStream, force) {
    return gm(inStream).resize(width, height, force ? '!' : undefined).stream();
};

exports.picZoomDownload = function (req, res) {
    let width = req.params.width;
    let height = req.params.height;
    getStream(req, res, picType).then(function (stream) {
        resize(width, height, stream, true).pipe(res);
    }).catch(function (err) {
        logger.error(err);
        throw new CommonError('下载失败');
    });
};

exports.picZoomWidthDownload = function (req, res) {
    let width = req.params.width;
    getStream(req, res, picType).then(function (stream) {
        resize(width, undefined, stream, true).pipe(res);
    }).catch(function (err) {
        logger.error(err);
        throw new CommonError('下载失败');
    });
};

exports.picZoomHeightDownload = function (req, res) {
    let height = req.params.height;
    getStream(req, res, picType).then(function (stream) {
        resize(undefined, height, stream, true).pipe(res);
    }).catch(function (err) {
        logger.error(err);
        throw new CommonError('下载失败');
    });
};
exports.picCutDownload = function (req, res) {
    let _x = req.params.x;
    let _y = req.params.y;
    let _width = req.params.width;
    let _height = req.params.height;
    getStream(req, res, picType).then(function (stream) {
        gm(stream).crop(_width, _height, _x, _y).stream().pipe(res);
    }).catch(function (err) {
        logger.error(err);
        throw new CommonError('下载失败');
    });
};
