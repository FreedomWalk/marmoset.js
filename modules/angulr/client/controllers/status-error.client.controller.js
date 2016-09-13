/**
 * Created by jiangyun on 16/9/5.
 */
(function () {
    'use strict';
    angular.module('angulr')
        .controller('StatusErrorController', StatusErrorController);

    /* @ngInject */
    function StatusErrorController($scope, $stateParams, Authentication) {
        var vm = this;
        vm.status = $stateParams.code;
        vm.message = $stateParams.message;
        vm.user = Authentication.getUser();
    }
}());
