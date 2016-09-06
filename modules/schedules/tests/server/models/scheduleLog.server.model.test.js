'use strict';
var should = require('should'),
  mongoose = require('mongoose'),
  ScheduleLog = mongoose.model('ScheduleLog');
var path = require('path');
var logger = require(path.resolve('./config/lib/logger'));

/**
 * Globals
 */
var scheduleLogs = new Array();

describe('scheduleLogs test', function () {
  before(function (done) {
    ScheduleLog.remove().exec(done);
  });
  it('scheduleLogs test maxSize', function (done) {

    let max = ScheduleLog.Max_Size + 5;
    for (let i = 0; i < max; i++) {
      scheduleLogs[i] = new scheduleLogs({

        'address': '192.168.0.5',
        'scheduleName': 'j-' + i,
        'isSuccess': true,
        'err': ''
      });
      scheduleLogs[i].save();

    };
    for (let i = 0; i < 5; i++) {

      ScheduleLog.find({
        'scheduleName': 'j-' + i
      }).exec(function (err, log) {
        should.not.exist(err);
        should.not.exist(log);

      });
    };
    for (let i = 5; i < max; i++) {

      ScheduleLog.find({
        'scheduleName': 'j-' + i
      }).exec(function (err, log) {
        should.not.exist(err);
        should.exist(log);
      });
    };
    done();
  });

});
