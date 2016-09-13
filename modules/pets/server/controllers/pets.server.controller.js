/**
 * Created by bournewang on 16/8/1.
 */
'use strict';
const path = require('path');
const mongoose = require('mongoose');
const errorHandler = require(path.resolve(
    './modules/core/server/controllers/errors.server.controller'));
const Pet = mongoose.model('Pet');
const CommonError = require(path.resolve('./config/error/CommonError'));
const logger = require(path.resolve('./config/lib/logger'));

exports.create = function (req, res) {
    var pet = new Pet(req.body);
    pet.save(function (err) {
        if (err) {
            throw new CommonError(err.message, 500);
        } else {
            res.json(pet);
        }
    });
};
/**
 * Update an pet
 */
exports.update = function (req, res) {
    var pet = new Pet(req.body);
    Pet.update({
        _id: pet._id
    }, pet, {
        multi: false
    }, function (err, numberAffected, raw) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(pet);
        }
    });
};
/**
 * Delete a pet
 */
exports.remove = function (req, res) {
    var pet = new Pet(req.pet);
    pet.remove(function (err, obj) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(obj);
        }
    });
};
/**
 * List of pets
 */
exports.list = function (req, res) {
    Pet.find().sort('-created').exec(function (err, pets) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            // throw new CommonError('哈哈哈哈哈');
            res.json(pets);
        }
    });
};

exports.listPage = function (req, res) {
    let size = parseInt(req.params.pageSize, 0);
    let pageSize = size > 0 ? size : 5;
    let pageNum = parseInt(req.params.pageNum, 0);
    let queryString = req.params.queryString;
    let queryObj = JSON.parse(queryString);
    Pet.findPagination(queryObj.query, queryObj.sort, pageSize, pageNum).then(
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

exports.read = function (req, res) {
    // convert mongoose document to JSON
    var pet = req.pet ? req.pet.toJSON() : {};
    res.json(pet);
};

exports.petById = function (req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(500).send({
            message: '它不在了'
        });
    }
    Pet.findById(id).exec(function (err, pet) {
        if (err) {
            return next(err);
        } else if (!pet) {
            return res.status(500).send({
                message: '没有这个名字的狗狗'
            });
        }
        req.pet = pet;
        // res.json(pet);
        next();
    });
};
