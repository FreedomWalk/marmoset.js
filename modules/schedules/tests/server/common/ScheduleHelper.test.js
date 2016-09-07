'use strict';

/**
 * Module dependencies.
 */
const path = require('path');
const should = require('should');
const mongoose = require('mongoose');
const ScheduleLog = mongoose.model('ScheduleLog');
const Schedule = mongoose.model('Schedule');
const ip = require('ip');
const logger = require(path.resolve('./config/lib/logger'));
const ipAddress = ip.address();
const scheduleHelper = require(path.resolve(
    './modules/schedules/server/common/ScheduleHelper'));

/**
 * Globals
 */
var schedule1,
    schedule2,
    schedule3,
    schedule4;

describe('scheduleHelper test', function () {
    before(function (done) {
        schedule1 = new Schedule({
            address: '192.168.32.1',
            isValid: false
        });
        schedule2 = new Schedule({
            address: '192.168.101.45',
            isValid: true
        });
        schedule3 = new Schedule({
            address: '192.168.56.101',
            isValid: false
        });
        schedule4 = new Schedule({
            address: ipAddress,
            isValid: true
        });
        done();
    });
    beforeEach(function (done) {
        Schedule.remove(function () {
            ScheduleLog.remove(function () {
                console.log('All Schedules and Logger Removed!');
                done();
            });
        });
    });

    describe('scheduleHelper null record', function () {
        beforeEach(function (done) {
            console.log('scheduleHelper  beforeEach in!');
            done();
        });
        it('scheduleHelper null record and run', function (done) {
            let job = scheduleHelper.scheduleJob('scheduleTest',
                '* * * * * *',
                function () {
                    return new Promise(function (resolve, reject) {
                        console.log('success');
                        resolve();
                    });
                });
            setTimeout(function () {
                ScheduleLog.find(function (err, list) {
                    job.cancel();
                    should.not.exist(err);
                    var len = list.length;
                    len.should.be.exactly(5).and.be.a.Number;
                    for (var i = 0; i < list.length; i++) {
                        list[i].should.have.property(
                            'scheduleName',
                            'scheduleTest');
                        list[i].should.have.property(
                            'isSuccess',
                            true);

                    }
                    return done();
                });
            }, 5050);
        });
    });
    describe('scheduleHelper no same ip record and run', function () {
        beforeEach(function (done) {
            schedule1.save(function (err) {
                schedule2.save(function (err) {
                    schedule3.save(function (err) {
                        console.log(
                            'scheduleHelper no same ip record and run beforeEach in!'
                        );
                        return done();
                    });
                });
            });
        });
        it('scheduleHelper no same ip record and run', function (done) {
            let job = scheduleHelper.scheduleJob(
                'scheduleTest',
                '* * * * * *',
                function () {
                    return new Promise(function (resolve,
                                                 reject) {
                        should.failed();
                        resolve();
                    });
                });
            setTimeout(function () {
                ScheduleLog.find(function (err,
                                           list) {
                    job.cancel();
                    should.not.exist(err);
                    var len = list.length;
                    len.should.be.exactly(0).and.be.a.Number;
                    return done();
                });
            }, 5000);

        });
    });
    describe('scheduleHelper local ip record and run', function () {
        beforeEach(function (done) {
            schedule1.save(function (err) {
                schedule4.save(function (err) {
                    schedule3.save(function (err) {
                        console.log(
                            'scheduleHelper local ip record and run in! and ip:' +
                            schedule4.address
                        );
                        return done();
                    });
                });
            });
        });

        it('scheduleHelper local ip record and run sucess', function (done) {
            let job = scheduleHelper.scheduleJob(
                'scheduleTest3',
                '* * * * * *',
                function () {
                    return new Promise(function (resolve,
                                                 reject) {
                        resolve();
                    });
                });
            setTimeout(function () {
                ScheduleLog.find(function (err,
                                           list) {
                    job.cancel();
                    should.not.exist(err);
                    console.log('======' + list.length);
                    console.log('======' + list);
                    var len = list.length;
                    len.should.be.exactly(5).and.be.a.Number;
                    for (var i = 0; i < list.length; i++) {
                        list[i].should.have.property(
                            'scheduleName',
                            'scheduleTest3');
                        list[i].should.have.property(
                            'isSuccess',
                            true);
                        list[i].should.have.property(
                            'address',
                            ipAddress);

                    }
                    return done();
                });
            }, 5050);

        });
        it('scheduleHelper local ip record and run fail', function (done) {
            let job = scheduleHelper.scheduleJob(
                'scheduleTest4',
                '* * * * * *',
                function () {
                    return new Promise(function (resolve,
                                                 reject) {
                        reject(new Error('test failed'));
                    });
                });
            setTimeout(function () {
                ScheduleLog.find(function (err,
                                           list) {
                    job.cancel();
                    should.not.exist(err);
                    var len = list.length;
                    len.should.be.exactly(5).and.be.a.Number;
                    for (var i = 0; i < list.length; i++) {
                        list[i].should.have.property(
                            'scheduleName',
                            'scheduleTest4');
                        list[i].should.have.property(
                            'isSuccess',
                            false);
                        list[i].should.have.property(
                            'address',
                            ipAddress);
                        list[i].should.have.property(
                            'err',
                            'Error: test failed');

                    }
                    return done();
                });
            }, 5050);

        });
        it('scheduleHelper local ip record and run throw Error', function (done) {
            let job = scheduleHelper.scheduleJob(
                'scheduleTest4',
                '* * * * * *',
                function () {
                    return new Promise(function (resolve,
                                                 reject) {
                        throw new Error('test failed');
                    });
                });
            setTimeout(function () {
                ScheduleLog.find(function (err,
                                           list) {
                    job.cancel();
                    should.not.exist(err);
                    var len = list.length;
                    len.should.be.exactly(5).and.be.a.Number;
                    for (var i = 0; i < list.length; i++) {
                        list[i].should.have.property(
                            'scheduleName',
                            'scheduleTest4');
                        list[i].should.have.property(
                            'isSuccess',
                            false);
                        list[i].should.have.property(
                            'address',
                            ipAddress);
                        list[i].should.have.property(
                            'err',
                            'Error: test failed');

                    }
                    return done();
                });
            }, 5050);

        });
    });
});
