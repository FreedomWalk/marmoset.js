/**
 * Created by bournewang on 2016/9/26.
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let chatMessage = new Schema({
    content: String,
    chatTime: Number,
    sender: String,
    receiver: [String]
});

mongoose.model('ChatMessage', chatMessage);
