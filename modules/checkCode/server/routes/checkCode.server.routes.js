/**
 * Created by bournewang on 16/8/8.
 */
'use strict';
const checkCodes = require('../controllers/checkCode.server.controller');
module.exports = function(app) {
    app.route('/api/checkCode').post(checkCodes.create);
    app.route('/api/checkCode/check').post(checkCodes.check);
};
