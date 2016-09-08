/**
 * Created by pulin on 16/8/2.
 */
'use strict';
var bookspolicy = require('../policies/books.server.policy');
var books = require('../controllers/book.server.controller');
module.exports = function (app) {
  // Pet Routes


  // Setting up the pets profile api
  // app.route('/api/pet/all').get(pets.list);
  app.route('/api/book').all(bookspolicy.isAllowed).post(books.create);
  // app.route('/api/pet/:petId')
  //  .get(pets.read);
  // app.route('/api/pet').delete(pets.removeOAuthProvider);
  // app.route('/api/pet/password').post(pets.changePassword);
  // app.route('/api/pet/picture').post(pets.changeProfilePicture);

  // Finish by binding the user middlewareguo
  // app.param('petId', pets.petByID);
};
