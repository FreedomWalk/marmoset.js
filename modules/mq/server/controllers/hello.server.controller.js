/**
 * Created by bournewang on 16/8/10.
 */
const path = require('path');
const client = require(path.resolve('./config/lib/stomp'));
const logger = require(path.resolve('./config/lib/logger'));

exports.publish = function (req, res) {
  if (req.body) {
    client.publish(client.MQName.HELLO, req.body, function (err) {
      if (err) {
        logger.error(err);
        res.send('fail');
      } else {
        res.send('success');
      }
    });
  } else {
    res.send('empty body');
  }
};
