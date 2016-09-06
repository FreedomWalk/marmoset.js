/**
 * Created by jiangyun on 16/8/30.
 */
(function () {
    'use strict';
    angular.module('angulr')
        .controller('PageLockController', PageLockController);

    PageLockController.$inject = ['$scope', '$http', 'Authentication', '$location'];

    function PageLockController($scope, $http, Authentication, $location) {
        var vm = this;
        vm.lockOpen = lockOpen;
        vm.credentials = {};
        vm.authentication = Authentication;

        function lockOpen(isValid) {
            vm.error = null;


            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

                return false;
            }

            vm.credentials.username = Authentication.getUser().username;
            $http.post('/api/auth/signin', vm.credentials).success(function(response) {
                // If successful we assign the response to the global user model
                Authentication.setUser(response);

                // And redirect to the index page
                $location.path('/');
            }).error(function(response) {});
        }
    }
}());
