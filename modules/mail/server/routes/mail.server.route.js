'use strict';

let mails = require('../controllers/mail.server.controller');

module.exports = function (app) {
  // mails collection routes
  app.route('/api/mail').post(mails.send);
};
