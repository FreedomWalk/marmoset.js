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
      resources: '/api/book',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/book',
      permissions: ['post']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/book',
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
