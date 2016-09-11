/**
 * Created by jiangyun on 16/9/9.
 */
(function () {
    'use strict';

    angular
        .module('angulr')
        .controller('ResetPasswordController', ResetPasswordController);

    /* @ngInject */
    function ResetPasswordController($scope, $location) {
        var vm = this;
        vm.resetPassword = resetPassword;

        // Get an eventual error defined in the URL query string:
        vm.authError = $location.search().err;
        vm.isCollapsed = true;

        function resetPassword(isValid) {
            vm.authError = null;
            vm.isCollapsed = !vm.isCollapsed;
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

                return false;
            }

            //$http.post('/api/auth/signup', vm.credentials).success(function () {
            //    // If successful we assign the response to the global user model
            //    // And redirect to the previous or home page
            //}).error(function (response) {
            //    vm.authError = response.message;
            //});
        }
    }
}());
