/**
 * Created by bournewang on 16/8/10.
 */
'use strict';

const config = require('../config');
const logger = require('./logger');
const path = require('path');
const JSONUtils = require(path.resolve('./modules/core/server/common/JSONUtils'));
const stompit = require('stompit');


exports.publish = function (mqName, obj, callback) {
    stompit.connect(config.stomp.servers, function (error, client) {

        if (error) {
            logger.error('Unable to connect: ' + error.message);
            callback(error);
        }

        let frame = client.send(config.stomp.sendParams);
        obj.MQName = mqName;
        frame.end(JSON.stringify(obj));
        client.disconnect(function (error) {
            if (error) {
                logger.error('Error while disconnecting: ' + error.message);
                callback(error);
            }
            logger.info('Sent message');
            callback();
        });
    });
};

exports.subscribe = function (msgDealers) {
    let connections = new stompit.ConnectFailover(config.stomp.servers, config.stomp.reconnectOptions);

    connections.on('connecting', function (connector) {
        let address = connector.serverProperties.remoteAddress.transportPath;
        logger.debug('Connecting to ' + address);
    });

    connections.on('error', function (error) {

        let connectArgs = error.connectArgs;
        let address = connectArgs.host + ':' + connectArgs.port;

        logger.error('Connection error to ' + address + ': ' + error.message);
    });

    let channelFactory = new stompit.ChannelFactory(connections);


    channelFactory.channel(function (error, channel) {

        if (error) {
            logger.error('channel factory error: ' + error.message);
            return;
        }

        channel.subscribe(config.stomp.headers, function (error, message) {

            if (error) {
                logger.error('subscribe error: ' + error.message);
                return;
            }
            message.readString('utf8', function (error, string) {

                if (error) {
                    logger.error('read message error: ' + error.message);
                    return;
                }
                if (string) {
                    if (msgDealers && msgDealers instanceof Array) {
                        let canDeal = false;
                        let msgObject = {};
                        try {
                            msgObject = JSONUtils.parse(string);
                        } catch (error) {
                            logger.error(error);
                        }
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
                logger.debug('receive message: ' + string);

                channel.ack(message);

            });
        });
    });
};
