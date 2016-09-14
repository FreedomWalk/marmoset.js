/**
 * Created by jiangyun on 16/8/4.
 */
(function () {
    'use strict';

    angular
        .module('pets.services')
        .factory('PetsService', PetsService);

    PetsService.$inject = ['baseResource'];

    function PetsService(baseResource) {
        var Pet = baseResource('/api/pet/:petId', {
            petId: '@_id'
        }, {
            pageList: {
                url: '/api/pet/:pageSize/:pageNum/:queryString',
                method: 'GET'
            }
        });

        return Pet;
    }
}());
