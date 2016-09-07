/**
 * Created by bournewang on 16/8/1.
 */
'use strict';

module.exports = function (app) {
  // Pet Routes
  let wechats = require('../controllers/wechat.server.controller');

  // Setting up the pets profile api
  // app.route('/api/pet').get(pets.list);
  app.route('/api/wechat/text').post(wechats.sendText);
  app.route('/api/wechat/fans').get(wechats.getFans);
  app.route('/api/wechat/fanInfo/:openId').get(wechats.getUser);
  app.route('/api/wechat/fanInfos/:openIds').get(wechats.batchGetUser);
};
