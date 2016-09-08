/**
 * Created by bournewang on 16/8/9.
 */
'use strict';

const path = require('path');
const logger = require(path.resolve('./config/lib/logger'));
const scheduleHelper = require(path.resolve(
  './modules/schedules/server/common/ScheduleHelper'));
const mongoose = require('mongoose');
const Book = mongoose.model('Book');


/**
 * schedule - description
 *
 * @return {type}  description
 */
let everyMinuteSchedule = function () {
  scheduleHelper.scheduleJob('book_everyMinuteSchedule', '*/4 * * * * *', function (done) {
    done();
  });
};

let everySecondSchedule = function () {
  scheduleHelper.scheduleJob('book_everySecondSchedule', '*/5 * * * * *', function (done) {
    // let p = new Promise(function (resolve, reject) {
    let book = new Book({
      bookName: '不可能',
      bookBrief: '不可能的啊',
      bookPrice: 1232
    });
    book.save(function (err, obj) {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });
  //     return p;
  //   });
};
module.exports = function () {
  //everyMinuteSchedule();
  everySecondSchedule();
};
