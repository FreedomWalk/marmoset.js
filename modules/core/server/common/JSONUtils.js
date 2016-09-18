/**
 * Created by bournewang on 16/9/18.
 */
'use strict';

/**
 * toObj 默认将UTC日期转化成Date对象
 * @param {String} text
 */
function parse(text, reviver) {
    return JSON.parse(text, function (k, v) {
        if (reviver) {
            reviver(k, v);
        }
        if (typeof value === 'string') {
            let a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(v);
            if (a) {
                return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                    +a[5], +a[6]));
            }
        } else {
            return v;
        }
    });
}

/**
 * toJSON
 * @param value
 * @param replacer
 * @param space
 */
function stringify(value, replacer, space) {
    return JSON.stringify(value, replacer, space);
}

exports.parse = parse;
exports.stringify = stringify;
