/**
 * Created by pulin on 16/8/16.
 */
'use strict';
var schedulespolicy = require('../policies/schedule.server.policy');
var schedules = require('../controllers/schedule.server.controller');
module.exports = function (app) {

  app.route('/api/schedule').all(schedulespolicy.isAllowed).post(schedules.create)
    .put(schedules.update).delete(schedules.remove).get(schedules.list);
};
