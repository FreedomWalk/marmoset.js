/**
 * Created by bournewang on 16/8/10.
 */
'use strict';
var hello = require('../controllers/hello.server.controller');
module.exports = route;

function route(app) {
    app.route('/api/hello').post(hello.publish);
}
