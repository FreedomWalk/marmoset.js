'use strict';

const mongoose = require('mongoose');
const path = require('path');
const config = require(path.resolve('./config/config'));
require(path.resolve('./modules/schedules/server/models/schedule.server.model'));
const should = require('should');

let Schedule; // mongoose.model('Schedule');
let schedule1,
  schedule2,
  schedule3;

describe('Schedule Model Test', function () {
  beforeEach(function (done) {
    Schedule = mongoose.model('Schedule');
    mongoose.connect(config.db.uri, config.db.options, function () {
      Schedule.remove(function () {
        console.log('All Schedules Removed');
        schedule1 = {
          address: '192.168.56.123',
          isValid: false
        };
        schedule2 = {
          address: '192.168.10.4512',
          isValid: true
        };
        schedule3 = schedule1;
        done();
      });
    });

  });

  describe('save test', function () {
    it('should save without err ', function (done) {
      let schedule1_ = new Schedule(schedule1);
      console.log(schedule1_.address);
      schedule1_.save(function (err, schedule) {
        should.not.exist(err);
        should.exist(schedule);
        should.exist(schedule._id);
        schedule1_.remove(function (err, schedule) {
          should.not.exist(err);
          done();
        });
      });
    });

    it('should not save with same ip address', function (done) {
      let schedule1_ = new Schedule(schedule1);
      schedule1_.save(function (err, schedule) {
        should.not.exist(err);
        let schedule3_ = new Schedule(schedule3);
        schedule3_.save(function (err, obj) {
          should.exist(err);
          schedule1_.remove(function (err, obj) {
            done();
          });
        });
      });
    });

    it('should not save with invalid ip address', function (done) {
      let schedule2_ = new Schedule(schedule2);
      schedule2_.save(function (err, schedule) {
        should.exist(err);
        done();
      });
    });

  });

  describe('method can run test', function () {
    it('should can run if no schedule document', function (done) {
      Schedule.find(function (err, objs) {
        let ip = '192.168.10.1';
        objs.should.have.lengthOf(0);
        Schedule.canRun(ip).then(function () {
          should(true).ok;
          done();
        }, function (err) {
          should(false).ok;
          done();
        });
      });
    });
  });
});
