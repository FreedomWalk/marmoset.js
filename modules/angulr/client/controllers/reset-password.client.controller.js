/**
 * Created by jiangyun on 16/9/9.
 */
(function () {
    'use strict';

    angular
        .module('angulr')
        .controller('ResetPasswordController', ResetPasswordController);

    /* @ngInject */
    function ResetPasswordController($scope, $location, $http) {
        var vm = this;
        vm.forgotPassword = forgotPassword;

        // Get an eventual error defined in the URL query string:
        vm.authError = $location.search().err;
        vm.isCollapsed = true;

        function forgotPassword(isValid) {
            vm.success = vm.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.forgotPasswordForm');

                return false;
            }

            $http.post('/api/auth/forgot', vm.credentials).success(function (response) {
                // Show user success message and clear form
                vm.credentials = null;
                vm.success = response.message;

            }).error(function (response) {
                // Show user error message and clear form
                vm.credentials = null;
                vm.error = response.message;
            });
        }
    }
}());
