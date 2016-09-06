'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const path = require('path');
const config = require(path.resolve('./config/config'));
const should = require('should');

let childSchema;
let parentSchema;
let Parent;
describe('subdoc test ', function () {
  beforeEach(function (done) {
    mongoose.connect(config.db.uri, config.db.options, function () {
      // console.log('mongoose.connect');
      // childSchema = new Schema({
      //   name: 'string'
      // });
      //
      // parentSchema = new Schema({
      //   child: childSchema
      // });
      done();
      // Parent = mongoose.model('Parent', parentSchema);
    });
  });

  describe(' describe test', function () {
    it('should ', function (done) {
      // childSchema.pre('save', function (next) {
      //   console.log(this.name); // prints 'Leia'
      // });
      // let parent = new Parent({
      //   child: {
      //     name: 'Luke'
      //   }
      // });
      // // parent.child.name = 'Leia';
      // console.log('==============   !!!! parent.child.name = Leia');
      // parent.save(function (err, obj) {
      //   if (err) {
      //     console.log(err);
      //   }
      //   console.log('==============   !!!! parent.save');
      //   should.not.exist(err);
      //   done();
      // });
      var childSchema = new Schema({
        name: 'string'
      });

      var parentSchema = new Schema({
        children: childSchema
      });
      mongoose.model('Parent', parentSchema);
      mongoose.model('Child', childSchema);
      var Parent = mongoose.model('Parent');
      var Child = mongoose.model('Child');
      var parent = new Parent();
      var child = new Child({
        name: 'Lies'
      });
      // create a comment
      parent.children = child;
      // var subdoc = parent.children[0];
      // console.log(subdoc);
      // subdoc.isNew;

      parent.save(function (err) {
        if (err) {
          console.log(err);
          done();
        }
        console.log('Success!');
        done();
      });
    });
  });

  after(function (done) {
    mongoose.disconnect(function () {
      done();
    });
  });
});
