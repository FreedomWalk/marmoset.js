/**
 * Created by pulin on 16/8/2.
 */
'use strict';
const path = require('path');
const mongoose = require('mongoose');
const logger = require(path.resolve('./config/lib/logger'));
const Schema = mongoose.Schema;
var validateBookName = function (name) {
  // logger.info("Book name is " + name);
  // logger.error("Book name is error " + name);
  return (name !== '');
};
/**
 * Book Schema
 */
var BookSchema = new Schema({
  bookName: {
    type: String,
    trim: true,
    default: '',
    validate: [validateBookName, 'Please fill in book name']
  },
  bookBrief: {
    type: String,
    trim: true,
    default: ''
  },
  bookPrice: {
    type: Number,
    trim: true
  },
  publicData: {
    type: Number,
    default: Date.now()
  }
});

/**
 * Hook a pre save method to hash the password
 */
BookSchema.pre('save', function (next) {
  next();
});


mongoose.model('Book', BookSchema);
