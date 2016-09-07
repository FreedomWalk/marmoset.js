'use strict';
// var schedulespolicy = require('../policies/schedule.server.policy');
var scheduleLogs = require('../controllers/scheduleLog.server.controller');
module.exports = function (app) {

  app.route('/api/scheduleLog/:pageSize/:pageNum').get(scheduleLogs.list);
};
