'use strict';

const path = require('path');
const mongoose = require('mongoose');
const nodeSchedule = require('node-schedule');
const Schedule = mongoose.model('Schedule');
const ScheduleLogModel = mongoose.model('ScheduleLog');
const CommonError = require(path.resolve('./config/error/CommonError'));
const ip = require('ip');
const logger = require(path.resolve('./config/lib/logger'));
const ipAddress = ip.address();

/**
 * scheduleJob
 *
 * @param  {String} jobName               定时任务名称
 * @param  {String} cron                  cron表达式
 * @param  {Function} callback 返回值为done
 * @return {Object}                       Job对象
 */
exports.scheduleJob = function (jobName, cron, callback) {
  return nodeSchedule.scheduleJob(cron, function () {
    logger.info(
      'nodeSchedule.scheduleJob cron:' +
      cron);
    let done = function (error) {
      let body = {};
      body = {
        'address': ipAddress,
        'scheduleName': jobName,
        'isSuccess': !error,
        'err': error
      };
      let scheduleLogModel = new ScheduleLogModel(body);
      scheduleLogModel.save(function (err, scheduleN) {
        if (err) {
          logger.err(err);
        } else {
          logger.info('scheduleLogModel.save success:' +
            scheduleN);
        }
      });
    };
    Schedule.canRun(ipAddress).then(function () {
      callback(done);
    }).catch(done);
  });
};
