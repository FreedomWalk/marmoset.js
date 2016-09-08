'use strict';

/**
 * Module dependencies
 */
var acl = require('acl'),
  path = require('path'),
  policy = require(path.resolve('./modules/core/server/common/policyUtils'));
// Using the memory backend
acl = new acl(new acl.memoryBackend());

exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin', 'user'],
    allows: [{
      resources: '/api/fileInfo/:pageSize/:pageNum/:queryString',
      permissions: '*'
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/fileInfo/:pageSize/:pageNum/:queryString',
      permissions: '*'
    }]
  }]);
};

/**
 * Check If Articles Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  policy.isAllowed(req, res, next, acl);
};
