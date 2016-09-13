/**
 * Created by bournewang on 16/8/1.
 */
'use strict';

module.exports = function (app) {
    // Pet Routes
    var pets = require('../controllers/pets.server.controller');

    // Setting up the pets profile api
    // app.route('/api/pet').get(pets.list);
    app.route('/api/pet').post(pets.create).get(pets.list);
    app.route('/api/pet/:pageSize/:pageNum/:queryString').get(pets.listPage);
    app.route('/api/pet/:petId').delete(pets.remove).get(pets.read).put(pets.update);

    // Finish by binding the user middleware
    app.param('petId', pets.petById);
};
