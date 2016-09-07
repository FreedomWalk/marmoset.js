/**
 * Created by pulin on 16/8/7.
 */
'use strict';
exports.isAllowed = function (req, res, next, acl) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      throw new Error('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        throw new Error('用户没有权限!');
      }
    }
  });
};
