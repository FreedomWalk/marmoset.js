/**
 * Created by jiangyun on 16/8/16.
 */
(function () {
    'use strict';

    angular
        .module('pets')
        .controller('PetController', PetController);

    /* @ngInject */
    function PetController($scope, $state, pet, $window, Authentication) {
        var vm = this;

        vm.pet = pet;
        vm.authentication = Authentication;
        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.save = save;
        //vm.types = [{
        //    value: 'ChineseRuralDog',
        //    name: 'ChineseRuralDog'
        //}, {
        //    value: 'SiberianHusky',
        //    name: 'SiberianHusky'
        //}, {
        //    value: 'GoldenRetriever',
        //    name: 'GoldenRetriever'
        //}];

        vm.types = ['ChineseRuralDog', 'SiberianHusky', 'GoldenRetriever'];

        // Remove existing Article
        function remove() {
            if ($window.confirm('Are you sure you want to delete?')) {
                vm.pet.$remove($state.go('admin.pets.list'));
            }
        }

        // Save Article
        function save(isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.form.petForm');
                return false;
            }

            // Create a new pet, or update the current instance
            vm.pet.$createOrUpdate()
                .then(successCallback)
                .catch(errorCallback);

            function successCallback(res) {
                $state.go('pets.list'); // should we send the User to the list or the updated Article's view?
            }

            function errorCallback(res) {
                vm.error = res.data.message;
            }
        }
    }
}());
