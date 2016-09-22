/**
 * Created by bournewang on 2016/9/22.
 */
/**
 * Created by pulin on 16/8/16.
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MODEL_NAME = 'Shuangseqiu';

let Shuangseqiu = new Schema({}, {
    strict: false
});

mongoose.model(MODEL_NAME, Shuangseqiu);
