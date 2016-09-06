/**
 * Created by jiangyun on 16/8/4.
 */
(function () {
    'use strict';

    angular
        .module('pets')
        .controller('PetsController', PetsController);

    /* @ngInject */
    function PetsController($scope, pet, Authentication) {
        var vm = this;

        vm.pet = pet;
        vm.authentication = Authentication;
        vm.error = null;

    }
}());
