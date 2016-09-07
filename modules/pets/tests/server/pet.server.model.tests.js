/**
 * Created by bournewang on 16/8/3.
 */
'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Pet = mongoose.model('Pet');

/**
 * Globals
 */
var pet1,
    pet2,
    pet3;

/**
 * Unit tests
 */
describe('Pet Model Unit Tests:', function () {

    before(function () {
        pet1 = {
            name: 'SSS科科科',
            type: 'ChineseRuralDog',
            master: 'iioioi'
        };
        pet2 = pet1;
        pet3 = {
            name: 'KKK刷刷刷',
            type: 'ChineseRuralDog',
            master: 'iioioi'
        };
        // pet1 = {
        //   firstName: 'Full',
        //   lastName: 'Name',
        //   displayName: 'Full Name',
        //   email: 'test@test.com',
        //   petname: 'petname',
        //   password: 'M3@n.jsI$Aw3$0m3',
        //   provider: 'local'
        // };
        // // pet2 is a clone of pet1
        // pet2 = pet1;
        // pet3 = {
        //   firstName: 'Different',
        //   lastName: 'Pet',
        //   displayName: 'Full Different Name',
        //   email: 'test3@test.com',
        //   petname: 'different_petname',
        //   password: 'Different_Password1!',
        //   provider: 'local'
        // };
    });


    describe('Method Save', function () {
        it('should begin with no pets', function (done) {
            Pet.find({}, function (err, pets) {
                pets.should.have.length(0);
                done();
            });
        });

        it('should be able to save without problems', function (done) {
            var _pet1 = new Pet(pet1);

            _pet1.save(function (err) {
                should.not.exist(err);
                _pet1.remove(function (err) {
                    should.not.exist(err);
                    done();
                });
            });
        });

        it('should fail to save an existing pet again', function (done) {
            var _pet1 = new Pet(pet1);
            var _pet2 = new Pet(pet2);

            _pet1.save(function () {
                _pet2.save(function (err) {
                    should.not.exist(err);
                    _pet1.remove(function (err) {
                        should.not.exist(err);
                        done();
                    });
                });
            });
        });


        it('should be able to save 2 different pets', function (done) {
            var _pet1 = new Pet(pet1);
            var _pet3 = new Pet(pet3);

            _pet1.save(function (err) {
                should.not.exist(err);
                _pet3.save(function (err) {
                    should.not.exist(err);
                    _pet3.remove(function (err) {
                        should.not.exist(err);
                        _pet1.remove(function (err) {
                            should.not.exist(err);
                            done();
                        });
                    });
                });
            });
        });


    });

    // describe('Pet Password Validation Tests', function() {
    //   it('should validate when the password strength passes - "P@$$w0rd!!"', function () {
    //     var _pet1 = new Pet(pet1);
    //     _pet1.password = 'P@$$w0rd!!';
    //
    //     _pet1.validate(function (err) {
    //       should.not.exist(err);
    //     });
    //   });
    //
    //   it('should validate a randomly generated passphrase from the static schema method', function () {
    //     var _pet1 = new Pet(pet1);
    //
    //     Pet.generateRandomPassphrase()
    //       .then(function (password) {
    //         _pet1.password = password;
    //         _pet1.validate(function (err) {
    //           should.not.exist(err);
    //         });
    //       })
    //       .catch(function (err) {
    //         should.not.exist(err);
    //       });
    //
    //   });
    //
    //   it('should validate when the password is undefined', function () {
    //     var _pet1 = new Pet(pet1);
    //     _pet1.password = undefined;
    //
    //     _pet1.validate(function (err) {
    //       should.not.exist(err);
    //     });
    //   });
    //
    //   it('should validate when the passphrase strength passes - "Open-Source Full-Stack Solution For MEAN Applications"', function () {
    //     var _pet1 = new Pet(pet1);
    //     _pet1.password = 'Open-Source Full-Stack Solution For MEAN Applications';
    //
    //     _pet1.validate(function (err) {
    //       should.not.exist(err);
    //     });
    //   });
    //
    //   it('should not allow a password less than 10 characters long - "P@$$w0rd!"', function (done) {
    //     var _pet1 = new Pet(pet1);
    //     _pet1.password = 'P@$$w0rd!';
    //
    //     _pet1.validate(function (err) {
    //       err.errors.password.message.should.equal('The password must be at least 10 characters long.');
    //       done();
    //     });
    //   });
    //
    //   it('should not allow a password greater than 128 characters long.', function (done) {
    //     var _pet1 = new Pet(pet1);
    //     _pet1.password = ')!/uLT="lh&:`6X!]|15o!$!TJf,.13l?vG].-j],lFPe/QhwN#{Z<[*1nX@n1^?WW-%_.*D)m$toB+N7z}kcN#B_d(f41h%w@0F!]igtSQ1gl~6sEV&r~}~1ub>If1c+';
    //
    //     _pet1.validate(function (err) {
    //       err.errors.password.message.should.equal('The password must be fewer than 128 characters.');
    //       done();
    //     });
    //   });
    //
    //   it('should not allow a password with 3 or more repeating characters - "P@$$w0rd!!!"', function (done) {
    //     var _pet1 = new Pet(pet1);
    //     _pet1.password = 'P@$$w0rd!!!';
    //
    //     _pet1.validate(function (err) {
    //       err.errors.password.message.should.equal('The password may not contain sequences of three or more repeated characters.');
    //       done();
    //     });
    //   });
    //
    //   it('should not allow a password with no uppercase letters - "p@$$w0rd!!"', function (done) {
    //     var _pet1 = new Pet(pet1);
    //     _pet1.password = 'p@$$w0rd!!';
    //
    //     _pet1.validate(function (err) {
    //       err.errors.password.message.should.equal('The password must contain at least one uppercase letter.');
    //       done();
    //     });
    //   });
    //
    //   it('should not allow a password with less than one number - "P@$$word!!"', function (done) {
    //     var _pet1 = new Pet(pet1);
    //     _pet1.password = 'P@$$word!!';
    //
    //     _pet1.validate(function (err) {
    //       err.errors.password.message.should.equal('The password must contain at least one number.');
    //       done();
    //     });
    //   });
    //
    //   it('should not allow a password with less than one special character - "Passw0rdss"', function (done) {
    //     var _pet1 = new Pet(pet1);
    //     _pet1.password = 'Passw0rdss';
    //
    //     _pet1.validate(function (err) {
    //       err.errors.password.message.should.equal('The password must contain at least one special character.');
    //       done();
    //     });
    //   });
    // });

    // describe('Pet E-mail Validation Tests', function() {
    //   it('should not allow invalid email address - "123"', function (done) {
    //     var _pet1 = new Pet(pet1);
    //
    //     _pet1.email = '123';
    //     _pet1.save(function (err) {
    //       if (!err) {
    //         _pet1.remove(function (err_remove) {
    //           should.exist(err);
    //           should.not.exist(err_remove);
    //           done();
    //         });
    //       } else {
    //         should.exist(err);
    //         done();
    //       }
    //     });
    //
    //   });
    //
    //   it('should not allow invalid email address - "123@123@123"', function (done) {
    //     var _pet1 = new Pet(pet1);
    //
    //     _pet1.email = '123@123@123';
    //     _pet1.save(function (err) {
    //       if (!err) {
    //         _pet1.remove(function (err_remove) {
    //           should.exist(err);
    //           should.not.exist(err_remove);
    //           done();
    //         });
    //       } else {
    //         should.exist(err);
    //         done();
    //       }
    //     });
    //
    //   });
    //
    //   it('should allow email address - "123@123"', function (done) {
    //     var _pet1 = new Pet(pet1);
    //
    //     _pet1.email = '123@123';
    //     _pet1.save(function (err) {
    //       if (!err) {
    //         _pet1.remove(function (err_remove) {
    //           should.not.exist(err);
    //           should.not.exist(err_remove);
    //           done();
    //         });
    //       } else {
    //         should.not.exist(err);
    //         done();
    //       }
    //     });
    //
    //   });
    //
    //   it('should not allow invalid email address - "123.com"', function (done) {
    //     var _pet1 = new Pet(pet1);
    //
    //     _pet1.email = '123.com';
    //     _pet1.save(function (err) {
    //       if (!err) {
    //         _pet1.remove(function (err_remove) {
    //           should.exist(err);
    //           should.not.exist(err_remove);
    //           done();
    //         });
    //       } else {
    //         should.exist(err);
    //         done();
    //       }
    //     });
    //
    //   });
    //
    //   it('should not allow invalid email address - "@123.com"', function (done) {
    //     var _pet1 = new Pet(pet1);
    //
    //     _pet1.email = '@123.com';
    //     _pet1.save(function (err) {
    //       if (!err) {
    //         _pet1.remove(function (err_remove) {
    //           should.exist(err);
    //           should.not.exist(err_remove);
    //           done();
    //         });
    //       } else {
    //         should.exist(err);
    //         done();
    //       }
    //     });
    //   });
    //
    //   // it('should not allow invalid email address - "abc@abc@abc.com"', function (done) {
    //   //   var _pet1 = new Pet(pet1);
    //   //
    //   //   _pet1.email = 'abc@abc@abc.com';
    //   //   _pet1.save(function (err) {
    //   //     if (!err) {
    //   //       _pet1.remove(function (err_remove) {
    //   //         should.exist(err);
    //   //         should.not.exist(err_remove);
    //   //         done();
    //   //       });
    //   //     } else {
    //   //       should.exist(err);
    //   //       done();
    //   //     }
    //   //   });
    //   // });
    //
    //   // it('should not allow invalid characters in email address - "abc~@#$%^&*()ef=@abc.com"', function (done) {
    //   //   var _pet1 = new Pet(pet1);
    //   //
    //   //   _pet1.email = 'abc~@#$%^&*()ef=@abc.com';
    //   //   _pet1.save(function (err) {
    //   //     if (!err) {
    //   //       _pet1.remove(function (err_remove) {
    //   //         should.exist(err);
    //   //         should.not.exist(err_remove);
    //   //         done();
    //   //       });
    //   //     } else {
    //   //       should.exist(err);
    //   //       done();
    //   //     }
    //   //   });
    //   // });
    //
    //   // it('should not allow space characters in email address - "abc def@abc.com"', function (done) {
    //   //   var _pet1 = new Pet(pet1);
    //   //
    //   //   _pet1.email = 'abc def@abc.com';
    //   //   _pet1.save(function (err) {
    //   //     if (!err) {
    //   //       _pet1.remove(function (err_remove) {
    //   //         should.exist(err);
    //   //         should.not.exist(err_remove);
    //   //         done();
    //   //       });
    //   //     } else {
    //   //       should.exist(err);
    //   //       done();
    //   //     }
    //   //   });
    //   // });
    //   //
    //   // it('should not allow doudble quote characters in email address - "abc\"def@abc.com"', function (done) {
    //   //   var _pet1 = new Pet(pet1);
    //   //
    //   //   _pet1.email = 'abc\"def@abc.com';
    //   //   _pet1.save(function (err) {
    //   //     if (err) {
    //   //       _pet1.remove(function (err_remove) {
    //   //         should.exist(err);
    //   //         should.not.exist(err_remove);
    //   //         done();
    //   //       });
    //   //     } else {
    //   //       should.exist(err);
    //   //       done();
    //   //     }
    //   //   });
    //   // });
    //
    //   // it('should not allow double dotted characters in email address - "abcdef@abc..com"', function (done) {
    //   //   var _pet1 = new Pet(pet1);
    //   //
    //   //   _pet1.email = 'abcdef@abc..com';
    //   //   _pet1.save(function (err) {
    //   //     if (err) {
    //   //       _pet1.remove(function (err_remove) {
    //   //         should.exist(err);
    //   //         should.not.exist(err_remove);
    //   //         done();
    //   //       });
    //   //     } else {
    //   //       should.exist(err);
    //   //       done();
    //   //     }
    //   //   });
    //   // });
    //   //
    //   // it('should allow single quote characters in email address - "abc\'def@abc.com"', function (done) {
    //   //   var _pet1 = new Pet(pet1);
    //   //
    //   //   _pet1.email = 'abc\'def@abc.com';
    //   //   _pet1.save(function (err) {
    //   //     if (!err) {
    //   //       _pet1.remove(function (err_remove) {
    //   //         should.not.exist(err);
    //   //         should.not.exist(err_remove);
    //   //         done();
    //   //       });
    //   //     } else {
    //   //       should.not.exist(err);
    //   //       done();
    //   //     }
    //   //   });
    //   // });
    //
    //   // it('should allow valid email address - "abc@abc.com"', function (done) {
    //   //   var _pet1 = new Pet(pet1);
    //   //
    //   //   _pet1.email = 'abc@abc.com';
    //   //   _pet1.save(function (err) {
    //   //     if (!err) {
    //   //       _pet1.remove(function (err_remove) {
    //   //         should.not.exist(err);
    //   //         should.not.exist(err_remove);
    //   //         done();
    //   //       });
    //   //     } else {
    //   //       should.not.exist(err);
    //   //       done();
    //   //     }
    //   //   });
    //   // });
    //
    //   // it('should allow valid email address - "abc+def@abc.com"', function (done) {
    //   //   var _pet1 = new Pet(pet1);
    //   //
    //   //   _pet1.email = 'abc+def@abc.com';
    //   //   _pet1.save(function (err) {
    //   //     if (!err) {
    //   //       _pet1.remove(function (err_remove) {
    //   //         should.not.exist(err);
    //   //         should.not.exist(err_remove);
    //   //         done();
    //   //       });
    //   //     } else {
    //   //       should.not.exist(err);
    //   //       done();
    //   //     }
    //   //   });
    //   // });
    //
    //   // it('should allow valid email address - "abc.def@abc.com"', function (done) {
    //   //   var _pet1 = new Pet(pet1);
    //   //
    //   //   _pet1.email = 'abc.def@abc.com';
    //   //   _pet1.save(function (err) {
    //   //     if (!err) {
    //   //       _pet1.remove(function (err_remove) {
    //   //         should.not.exist(err);
    //   //         should.not.exist(err_remove);
    //   //         done();
    //   //       });
    //   //     } else {
    //   //       should.not.exist(err);
    //   //       done();
    //   //     }
    //   //   });
    //   // });
    //
    //   // it('should allow valid email address - "abc.def@abc.def.com"', function (done) {
    //   //   var _pet1 = new Pet(pet1);
    //   //
    //   //   _pet1.email = 'abc.def@abc.def.com';
    //   //   _pet1.save(function (err) {
    //   //     if (!err) {
    //   //       _pet1.remove(function (err_remove) {
    //   //         should.not.exist(err);
    //   //         should.not.exist(err_remove);
    //   //         done();
    //   //       });
    //   //     } else {
    //   //       should.not.exist(err);
    //   //       done();
    //   //     }
    //   //   });
    //   // });
    //
    //   // it('should allow valid email address - "abc-def@abc.com"', function (done) {
    //   //   var _pet1 = new Pet(pet1);
    //   //
    //   //   _pet1.email = 'abc-def@abc.com';
    //   //   _pet1.save(function (err) {
    //   //     should.not.exist(err);
    //   //     if (!err) {
    //   //       _pet1.remove(function (err_remove) {
    //   //         should.not.exist(err_remove);
    //   //         done();
    //   //       });
    //   //     } else {
    //   //       done();
    //   //     }
    //   //   });
    //   // });
    //
    // });

    after(function (done) {
        Pet.remove().exec(done);
    });
});
