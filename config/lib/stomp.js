/**
 * Created by bournewang on 16/8/10.
 */
'use strict';

const stomp = require('webstomp-client'),
    config = require('../config'),
    logger = require('./logger'),
    WebSocket = require('ws'),
    url = config.stomp.url;
const path = require('path');
const JSONUtils = require(path.resolve('./modules/core/server/JSONUtils'));

exports.publish = function (mqName, obj, callback) {
    let ws = new WebSocket(url);
    let client = stomp.over(ws, {debug: false});
    ws.on('close', function close() {
        console.error('disconnected', arguments);
    });
    client.connect(config.stomp.connectHeader, function () {
        obj.MQName = mqName;
        client.send(config.stomp.defaultQueue, JSONUtils.stringify(obj));
        client.disconnect();
        callback();
    }, function (err) {
        logger.error(err);
        client.disconnect();
        callback(err);
    });
};

exports.subscribe = function (msgDealers) {
    let client = stomp.over(new WebSocket(url), {debug: false});
    client.connect(config.stomp.connectHeader, function () {
        client.subscribe(config.stomp.defaultQueue, function (message) {
            if (message.body) {
                if (msgDealers && msgDealers instanceof Array) {
                    let canDeal = false;
                    let msgObject = JSONUtils.parse(message.body);
                    for (let i = 0; i < msgDealers.length; i++) {
                        let msgDealer = msgDealers[i];
                        if (msgObject.MQName === msgDealer.MQName) {
                            canDeal = true;
                            msgDealer.dealMessage(msgObject);
                            break;
                        }
                    }
                    if (!canDeal) {
                        logger.error('No receiver for ' + msgObject.MQName);
                    }
                }
            } else {
                logger.error('Empty message');
            }
        });
    });
};
