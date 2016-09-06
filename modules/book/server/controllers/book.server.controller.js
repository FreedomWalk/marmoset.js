/**
 * Created by pulin on 16/8/2.
 */
'use strict';
var path = require('path');
var mongoose = require('mongoose');
var Book = mongoose.model('Book');

exports.create = function (req, res) {

  var book = new Book(req.body);
  book.save(function (err) {
    if (err) {
      throw new Error(err);
    } else {
      res.json(book);
    }
  });

};
