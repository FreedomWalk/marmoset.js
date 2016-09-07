/**
 * Created by bournewang on 16/8/8.
 */
'use strict';
var files = require('../controllers/file.server.controller'),
  filePolicy = require('../policies/file.server.policy');
module.exports = function(app) {
  // Pet Routes

  app.route('/api/file').post(filePolicy.isAllowed).post(files.upload);
  app.route('/api/file/:fileName').all(filePolicy.isAllowed).get(
    files.download);
  app.route('/api/pic/:fileName').get(filePolicy.isAllowed).get(files.picDownload);
  app.route('/api/pic/zoom/:width/:height/:fileName').get(filePolicy.isAllowed)
    .get(files.picZoomDownload);
  app.route('/api/pic/zoomByWidth/:width/:fileName').get(filePolicy.isAllowed)
    .get(files.picZoomWidthDownload);
  app.route('/api/pic/zoomByHeight/:height/:fileName').get(filePolicy.isAllowed)
    .get(files.picZoomHeightDownload);
  app.route('/api/pic/cut/:x/:y/:width/:height/:fileName').get(filePolicy.isAllowed)
    .get(files.picCutDownload);
};
