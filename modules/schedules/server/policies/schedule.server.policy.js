/**
 * Created by pulin on 16/8/16.
 */
'use strict';

/**
 * Module dependencies
 */
var acl = require('acl'),
  path = require('path'),
  policy = require(path.resolve('./modules/core/server/common/policyUtils'));
// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Articles Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/schedules',
      permissions: ['*']
    }]
  }, {
    roles: ['admin'],
    allows: [{
      resources: '/api/schedule',
      permissions: ['*']
    }]
  }]);
};

/**
 * Check If Articles Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  policy.isAllowed(req, res, next, acl);
};
