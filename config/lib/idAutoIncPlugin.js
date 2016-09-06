'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pad = require('pad');
const AUTO_ID = 'AutoId';

let AutoIdSchema = new Schema({
  _id: {
    type: String
  },
  maxId: {
    type: Number,
    default: 0
  }
});

AutoIdSchema.statics.nextId = function (modelName, start) {
  let self = this;
  return new Promise(function (resolve, reject) {
    self.findByIdAndUpdate(modelName, {
      $inc: {
        maxId: 1
      }
    }, {
      new: true
        // upsert: true
    }, function (err, obj) {
      if (err) {
        throw err;
      }
      if (obj) {
        resolve(obj);
      } else {
        self.create({
          _id: modelName,
          maxId: start
        }, function (err, obj) {
          if (err) {
            throw err;
          }
          if (obj) {
            resolve(obj);
          }
        });
      }

    });
  });
};

mongoose.model(AUTO_ID, AutoIdSchema);

let getId = function (modelName, start) {
  let AutoId = mongoose.model(AUTO_ID);
  return AutoId.nextId(modelName, start);
};


/**
 * ID自增插件
 *
 * @param  {Schema} schema
 * @param  {Object} options {options#schemaName 集合名
 *                           options#prefix ID前缀
 *                           options#start ID起始数
 *                           options#length ID长度}
 */
let idAutoIncPlugin = function (schema, options) {
  schema.add({
    _id: String
  });
  if (!options.schemaName) {
    throw new Error('schemaName is required');
  }
  let schemaName = options.schemaName ? options.schemaName : undefined;
  let prefix = options.prefix ? options.prefix : 'ID';
  let start = options.start ? options.start : 0;
  let length = options.length ? options.length : 11;
  schema.pre('save', function (next) {
    let self = this;
    getId(schemaName, start).then(function (obj) {
      self._id = prefix + pad(length, obj.maxId, '0');
      next();
    }).catch(function (err) {
      next(err);
    });
  });
};

module.exports = idAutoIncPlugin;
