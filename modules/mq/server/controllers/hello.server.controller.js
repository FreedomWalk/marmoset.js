/**
 * Created by bournewang on 16/8/10.
 */
const path = require('path');
const client = require(path.resolve('./config/lib/stomp'));
const logger = require(path.resolve('./config/lib/logger'));
const mqName = require(path.resolve('./modules/mq/server/common/mq.server.common.name.js'));
/**FFFFFFFFFF */
exports.publish = function (req, res) {
  if (req.body) {
    client.publish(mqName.HELLO, req.body, function (err) {
      if (err) {
        logger.error(err);
        // wefwef
        // weafwe 34rf3q 43r
        res.send('fail');
      } else {
        res.send('success');
        logger.info('ces');
      }
    });
  } else {
    res.send('empty body');
  }
};

