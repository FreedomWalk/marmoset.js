'use strict';

const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const logger = require(path.resolve('./config/lib/logger'));

let CheckCodeSchema = new Schema({
    code: {
        type: String,
        trim: true,
        required: 'Please insert code'
    },
    failTime: Date,

});

CheckCodeSchema.methods.check = check;

function check(code) {
    return code && this.code.toLowerCase() === code.toLowerCase();
}

mongoose.model('CheckCode', CheckCodeSchema);
