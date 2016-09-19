'use strict';

/**
 * Module dependencies.
 */
const config = require('../config'),
    chalk = require('chalk'),
    path = require('path'),
    mongoose = require('mongoose');
const Pagination = require('./Pagination');
const logger = require(path.resolve('./config/lib/logger'));


// Load the mongoose models
module.exports.loadModels = loadModels;
// Initialize Mongoose
module.exports.connect = connect;

module.exports.disconnect = disconnect;

function connect(cb) {
    var _this = this;

    var db = mongoose.connect(config.db.uri, config.db.options, function (err) {
        // Log Error
        if (err) {
            logger.error(chalk.red('Could not connect to MongoDB!'));
            logger.error(err);
        } else {

            // Enabling mongoose debug mode if required
            mongoose.set('debug', config.db.debug);

            // Call callback FN
            if (cb) cb(db);
        }
    });
}

function disconnect(cb) {
    mongoose.disconnect(function (err) {
        logger.info(chalk.yellow('Disconnected from MongoDB.'));
        cb(err);
    });
}

function loadModels(callback) {
    mongoose.plugin(baseFieldPlugin);
    mongoose.plugin(paginationPlugin);
    // Globbing model files
    config.files.server.models.forEach(function (modelPath) {
        require(path.resolve(modelPath));
    });

    if (callback) callback();
}

function baseFieldPlugin(schema) {
    schema.set('toJSON', {virtuals: true});
    schema.add({
        updated: {
            type: Date,
            default: Date.now
        },
        updateId: String,
        created: {
            type: Date,
            default: Date.now
        },
        creator: {
            type: String
        }
    });
    schema.pre('update', function (next) {
        this.updated = Date.now;
        next();
    });
}

function paginationPlugin(schema) {

    schema.statics.findPagination = function (query, sort, pageSize,
                                              pageNum) {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.count(query, function (err, totalCount) {
                if (err) {
                    throw err;
                }
                let pagination = new Pagination(pageSize, pageNum,
                    totalCount);
                self.find(query).sort(sort).skip(pageSize * pageNum).limit(
                    pageSize).exec(
                    function (err, array) {
                        if (err) {
                            throw err;
                        } else {
                            pagination.data = array;
                            resolve(pagination);
                        }
                    });
            });
        });
    };
}
