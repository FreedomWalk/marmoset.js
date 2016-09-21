/**
 * Created by bournewang on 16/9/20.
 */
'use strict';

const path = require('path');
require(path.resolve('./modules/checkCode/server/models/checkCode.server.model'));
const mongoose = require('mongoose');
const config = require(path.resolve('./config/config'));
const CheckCode = mongoose.model('CheckCode');
const should = require('should');
const CODE = '2IKSJJ';
let obj1;
let obj2;
let obj3;

describe('checkCode model test', function () {

    before(function (done) {
        const offset = 1000 * 60 * 60;
        mongoose.connect(config.db.uri, config.db.options, function () {
            obj1 = {
                code: CODE,
                validTime: new Date(new Date().getTime() + offset),
                valid: true
            };
            obj2 = {
                code: CODE,
                validTime: new Date(new Date().getTime() - offset),
                valid: true
            };
            obj3 = {
                code: CODE,
                validTime: new Date(new Date().getTime() + offset),
                valid: false
            };
            done();
        });
    });

    beforeEach(function (done) {
        CheckCode.remove({}, function (err) {
            if (err)
                console.error(err);
            else
                console.info('CheckCode is empty');
            done();
        });
    });

    describe('checkCode check method test', function () {
        it('should success with correct code', function (done) {
            let cc1 = new CheckCode(obj1);
            cc1.save(function (err, result) {
                should.not.exist(err);
                should.exist(result);
                should.exist(result._id);
                result.check(CODE).then(function () {
                    should(true).ok();
                    done();
                }, function () {
                    should(false).ok();
                    done();
                });
            });
        });

        it('should not pass with error code', function (done) {
            let cc1 = new CheckCode(obj1);
            cc1.save(function (err, result) {
                should.not.exist(err);
                should.exist(result);
                should.exist(result._id);
                result.check('OPJJLL').then(function () {
                    should(false).ok();
                    done();
                }, function () {
                    should(true).ok();
                    done();
                });
            });
        });

        it('should not pass with expired time ', function (done) {
            let cc2 = new CheckCode(obj2);
            cc2.save(function (err, result) {
                should.not.exist(err);
                should.exist(result);
                should.exist(result._id);
                result.check(CODE).then(function () {
                    should(false).ok();
                    done();
                }, function () {
                    should(true).ok();
                    done();
                });
            });
        });

        it('should not pass with same code twice ', function (done) {
            let cc1 = new CheckCode(obj1);
            cc1.save(function (err, result) {
                should.not.exist(err);
                should.exist(result);
                should.exist(result._id);
                result.check(CODE).then(function () {
                    should(true).ok();
                    CheckCode.findById(result._id, function (err, result2) {
                        should.not.exist(err);
                        result2.check(CODE).then(function () {
                            should(false).ok();
                            done();
                        }, function () {
                            should(true).ok();
                            done();
                        });
                    });
                }, function () {
                    should(false).ok();
                    done();
                });
            });
        });

        it('should not pass with not valid CheckCode ', function (done) {
            let cc3 = new CheckCode(obj3);
            cc3.save(function (err, result) {
                should.not.exist(err);
                should.exist(result);
                should.exist(result._id);
                result.check(CODE).then(function () {
                    should(false).ok();
                    done();
                }, function () {
                    should(true).ok();
                    done();
                });
            });
        });

        it('should not pass with used CheckCode ', function (done) {
            let cc1 = new CheckCode(obj1);
            cc1.save(function (err, result) {
                should.not.exist(err);
                should.exist(result);
                should.exist(result._id);
                result.check('wefwfq1').then(function () {
                    should(false).ok();
                    done();
                }, function () {
                    CheckCode.findById(result._id, function (err, result2) {
                        should.not.exist(err);
                        result2.check(CODE).then(function () {
                            should(false).ok();
                            done();
                        }, function () {
                            should(true).ok();
                            done();
                        });
                    });
                });
            });
        });

        it('should ignore case', function (done) {
            let cc1 = new CheckCode(obj1);
            cc1.save(function (err, result) {
                should.not.exist(err);
                should.exist(result);
                should.exist(result._id);
                result.check(CODE.toLowerCase()).then(function () {
                    should(true).ok();
                    done();
                }, function () {
                    should(false).ok();
                    done();
                });
            });
        });
    });

    after(function (done) {
        mongoose.disconnect(function (err) {
            should.not.exists(err);
            done();
        });
    });

});
