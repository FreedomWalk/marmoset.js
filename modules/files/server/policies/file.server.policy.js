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
  app.route('/api/file').post(filePolicy.isAllowed).post(files.upload);
   app.route('/api/file/:fileId').delete(filePolicy.isAllowed).delete(files.remove);
   app.route('/api/file/:fileName').get(filePolicy.isAllowed).get(files.download);
   app.route('/api/file/:pageSize/:pageNum/:queryString').get(filePolicy.isAllowed)
     .get(files.download);
   app.route('/api/pic/:fileName').get(filePolicy.isAllowed).get(files.picDownload);
   app.route('/api/pic/zoom/:width/:high/:fileName').get(filePolicy.isAllowed)
     .get(files.picDownload);
   app.route('/api/pic/cut/:x/:y/:width/:high/:fileName').get(filePolicy.isAllowed)
     .get(files.picDownload);
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin', 'user'],
    allows: [{
      resources: '/api/file',
      permissions: '*'
    }, {
      resources: '/api/file/:fileName',
      permissions: '*'
    }, {
      resources: '/api/file/:pageSize/:pageNum/:queryString',
      permissions: '*'
    }, {
      resources: '/api/pic/:fileName',
      permissions: '*'
    }, {
      resources: '/api/pic/zoom/:width/:high/:fileName',
      permissions: '*'
    }, {
      resources: '/api/pic/cut/:x/:y/:width/:high/:fileName',
      permissions: '*'
    }, {
      resources: '/api/pic/zoomByWidth/:width/:fileName',
      permissions: '*'
    }, {
      resources: '/api/pic/zoomByHeight/:height/:fileName',
      permissions: '*'
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/file',
      permissions: '*'
    }, {
      resources: '/api/file/:fileName',
      permissions: ['get']
    }, {
      resources: '/api/pic/:fileName',
      permissions: ['get']
    }, {
      resources: '/api/pic/zoom/:width/:height/:fileName',
      permissions: '*'
    }, {
      resources: '/api/pic/cut/:x/:y/:width/:height/:fileName',
      permissions: ['get']
    }, {
      resources: '/api/pic/zoomByWidth/:width/:fileName',
      permissions: '*'
    }, {
      resources: '/api/pic/zoomByHeight/:height/:fileName',
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
