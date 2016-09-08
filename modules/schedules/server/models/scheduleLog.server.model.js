/**
 * Created by pulin on 16/8/16.
 */
'use strict';

const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const logger = require(path.resolve('./config/lib/logger'));
const idAutoIncPlugin = require(path.resolve('./config/lib/idAutoIncPlugin'));
const pad = require('pad');
const Max_Size = 1000;
const SCHEDULE_LOG = 'ScheduleLog';

let ScheduleLogSchema = new Schema({
  _id: {
    type: String
  },
  address: {
    type: String,
    trim: true
  },
  scheduleName: {
    type: String,
    trim: true,
    default: 'default'
  },
  isSuccess: {
    type: Boolean,
    default: false
  },

  err: String,
  created: {
    type: Date,
    default: Date.now
  }
}, {
  capped: {
    max: Max_Size,
    autoIndexId: true,
    _id: false
  }
});

ScheduleLogSchema.plugin(idAutoIncPlugin, {
  schemaName: SCHEDULE_LOG,
  prefix: 'SL',
  start: 100000,
  length: 11
});
mongoose.model(SCHEDULE_LOG, ScheduleLogSchema);
