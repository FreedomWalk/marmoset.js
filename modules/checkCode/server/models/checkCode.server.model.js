'use strict';

const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const logger = require(path.resolve('./config/lib/logger'));

let CheckCodeSchema = new Schema({
    code: {
        type: String,
        trim: true,
        required: 'Please insert originName'
    }
});

CheckCodeSchema.method.check = function (code) {
    return this.code === code;
};

mongoose.model('CheckCode', CheckCodeSchema);
