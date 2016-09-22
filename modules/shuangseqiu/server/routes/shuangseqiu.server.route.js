/**
 * Created by pulin on 16/8/16.
 */
'use strict';
var shuangseqius = require('../controllers/shuangseqiu.server.controller.js');
module.exports = function (app) {
    app.route('/api/shuangseqiu/:pageSize/:pageNum').get(shuangseqius.list);
    app.route('/api/shuangseqiu').post(shuangseqius.create);
    app.route('/api/shuangseqiu/:id').put(shuangseqius.update).delete(shuangseqius.remove);
};
