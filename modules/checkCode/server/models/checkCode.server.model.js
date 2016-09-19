'use strict';

const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const logger = require(path.resolve('./config/lib/logger'));
const q = require('q');


let CheckCodeSchema = new Schema({
    code: {
        type: String,
        trim: true,
        required: 'Please insert code'
    },
    validTime: Date,
    valid: {
        type: Boolean,
        default: true
    }
});

CheckCodeSchema.methods.check = check;

function check(code) {
    let self = this;
    let d = q.defer();
    if (self.valid && self.validTime > new Date()) {
        self.update({valid: false}, function (err) {
            if (err) {
                logger.error(err);
                d.reject(err);
            }
            if (code && self.code.toLowerCase() === code.toLowerCase()) {
                d.resolve();
            } else {
                d.reject();
            }
        });
    } else {
        d.reject();
    }
    return d.promise;
}

mongoose.model('CheckCode', CheckCodeSchema);
