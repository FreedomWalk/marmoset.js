/**
 * Created by pulin on 16/8/3.
 */
'use strict';
var should = require('should'),
  mongoose = require('mongoose'),
  Book = mongoose.model('Book');
var path = require('path');
var logger = require(path.resolve('./config/lib/logger'));
/**
 * Globals
 */
let book1,
  book2,
  book3;

describe('Book unit tests:', function () {
  before(function () {
    book1 = {
      bookName: '好书一本',
      bookBrief: '一本',
      bookPrice: 98.98,
      publicData: new Date('1987/11/8')
    };
    book2 = {
      bookName: '好书二本',
      bookBrief: '二本',
      bookPrice: 90.18,
      publicData: new Date('1988/11/8')
    };
    book3 = {
      bookName: '好书三本',
      bookBrief: '三本',
      bookPrice: 98.38,
      publicData: new Date('1986/11/8')
    };
  });


  describe('Method Save', function () {
    it('should begin with no Book', function (done) {
      Book.find({}, function (err, books) {
        books.should.have.length(0);
        done();
      });
    });
    it('should be able to save without problems', function (done) {
      var _book1 = new Book(book1);

      _book1.save(function (err, obj) {
        should.not.exist(err);
        Book.find({}, function (err, books) {
          books.should.have.length(1);
          logger.info('进去了:' + books[0].bookName);
          done();
        });
      });

    });
  });

  after(function (done) {
    Book.remove().exec(done);
  });
});
