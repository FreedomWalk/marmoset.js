/**
 * Created by bournewang on 16/8/8.
 */
'use strict';
const fileInfos = require('../controllers/fileInfo.server.controller'),
    fileInfoPolicy = require('../policies/fileInfo.server.policy');

module.exports = function (app) {
    app.route('/api/fileInfo/:pageSize/:pageNum/:queryString').get(fileInfoPolicy.isAllowed).get(fileInfos.list);
    app.route('/api/fileInfo/:fileId').all(fileInfoPolicy.isAllowed).get(fileInfos.read).delete(fileInfos.remove);
};
