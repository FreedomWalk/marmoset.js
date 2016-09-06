/**
 * Created by pulin on 16/8/16.
 */
'use strict';

const path = require('path');
const mongoose = require('mongoose');
const errorHandler = require(path.resolve(
  './modules/core/server/controllers/errors.server.controller'));
const Schedule = mongoose.model('Schedule');
const CommonError = require(path.resolve('./config/error/CommonError'));

exports.create = function (req, res) {

  var schedule = new Schedule(req.body);
  schedule.save(function (err) {
    if (err) {
      throw new Error(err);
    } else {
      res.json(schedule);
    }
  });

};

/**
 * Update an pet
 */
exports.update = function (req, res) {
  var schedule = new Schedule(req.body);
  schedule.update({
    _id: schedule._id
  }, schedule, {
    multi: false
  }, function (err, numberAffected, raw) {
    if (err) {
      throw new Error(err);
    } else {
      res.json(schedule);
    }

  });
};

/**
 * Delete a schedule
 */
exports.remove = function (req, res) {
  var schedule = new Schedule(req.pet);

  schedule.remove(function (err, obj) {
    if (err) {
      throw new Error(err);
    } else {
      res.json(obj);
    }
  });
};

/**
 * List of schedules
 */
exports.list = function (req, res) {
  Schedule.find().sort('-created').exec(function (err, schedules) {
    if (err) {
      throw new Error(err);
    } else {
      res.json(schedules);
    }
  });
};
