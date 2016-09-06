/**
 * Created by jiangyun on 16/9/5.
 */
(function () {
    'use strict';
    angular.module('angulr')
        .controller('StatusErrorController', StatusErrorController);

    StatusErrorController.$inject = ['$scope', '$stateParams'];

    function StatusErrorController($scope, $stateParams) {
        var vm = this;
        vm.status = $stateParams.status;
        vm.message = $stateParams.message;
    }
}());
