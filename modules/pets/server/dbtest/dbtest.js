/**
 * Created by bournewang on 16/8/1.
 */
require('../models/pet.server.model');
var mongoose = require('mongoose');
mongoose.connect('mongodb://yuki:yuki@192.168.56.101:27017/yuki');
var Pet = mongoose.model('Pet');


var pet = new Pet({name: 'Www', type: 'SiberianHusky', master: 'Ggg', remark: 2});

pet.save(function (err) {
  if (err)
    console.log(err);
});
