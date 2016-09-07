/**
 * Created by bournewang on 16/8/10.
 */
'use strict';
var hello = require('../controllers/hello.server.controller');
module.exports = function (app) {
  app.route('/api/hello').post(hello.publish);
};
