/**
 * Created by pulin on 16/8/16.
 */
'use strict';

const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const logger = require(path.resolve('./config/lib/logger'));
const q = require('q');

let validIp = function (ipAddress) {
  return (
      /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/
    )
    .test(ipAddress);
};

let ScheduleSchema = new Schema({
  address: {
    type: String,
    trim: true,
    validate: [validIp, 'Please input right ip address!'],
    unique: 'address already exists',
    required: 'Please insert address'
  },
  isValid: {
    type: Boolean,
    default: false
  }
});

ScheduleSchema.statics.canRun = function (ipAddress) {
  let _this = this;
  let defer = q.defer();
  _this.findOne({
    'isValid': true
  }, function (err, schedule) {
    if (err) {
      defer.reject(err);
    }
    if (!schedule) {
      defer.resolve();
    } else {
      if (ipAddress === schedule.address) {
        defer.resolve();
      } else {
        defer.reject();
      }
    }

  });
  return defer.promise;
};

mongoose.model('Schedule', ScheduleSchema);
