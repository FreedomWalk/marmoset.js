/**
 * Created by bournewang on 16/8/1.
 */
'use strict';

const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var logger = require(path.resolve('./modules/core/server/common/log4j.config'));
const logger = require(path.resolve('./config/lib/logger'));
const idAutoIncPlugin = require(path.resolve('./config/lib/idAutoIncPlugin'));
const PET = 'Pet';

var petSchema = new Schema({
  name: String,
  master: String,
  remark: Number,
  type: {
    type: String,
    enum: [
      /**
       * 中华田园犬
       */
      'ChineseRuralDog',
      /**
       * 哈士奇
       */
      'SiberianHusky',
      /**
       * 金毛
       */
      'GoldenRetriever'
    ],
    default: 'ChineseRuralDog'
  },
  created: {
    type: Date,
    default: Date.now
  }

});

/**
 * Hook a pre save method to hash the password
 */
petSchema.pre('save', function (next) {
  next();
});

petSchema.plugin(idAutoIncPlugin, {
  schemaName: PET,
  prefix: 'P',
  start: 100000,
  length: 11
});

mongoose.model('Pet', petSchema);
