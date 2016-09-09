(function () {
    'use strict';

    angular
        .module('angulr')
        .controller('AuthenticationController', AuthenticationController);

    /* @ngInject */
    function AuthenticationController($scope, $state, $http, $location, $window, Authentication, PasswordValidator,
                                      CheckCodeResource, $log) {
        var vm = this;

        vm.authentication = Authentication;
        vm.getPopoverMsg = PasswordValidator.getPopoverMsg;
        vm.signup = signup;
        vm.signin = signin;
        vm.callOauthProvider = callOauthProvider;
        vm.getCheckCode = getCheckCode;
        vm.codeUrl = '/api/checkCode';

        // Get an eventual error defined in the URL query string:
        vm.authError = $location.search().err;

        // If user is signed in then redirect back home
        //if (vm.authentication.user) {
        //    $location.path('/home');
        //}

        function signup(isValid) {
            vm.authError = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

                return false;
            }

            $http.post('/api/auth/signup', vm.credentials).success(function () {
                // If successful we assign the response to the global user model
                // And redirect to the previous or home page
                signin(isValid);
            }).error(function (response) {
                vm.authError = response.message;
            });
        }

        function signin(isValid) {
            vm.authError = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

                return false;
            }

            $http.post('/api/auth/signin', vm.credentials).success(function (response) {
                // If successful we assign the response to the global user model
                vm.authentication.setUser(response);

                // And redirect to the previous or home page
                $state.go('home');
            }).error(function (response) {
                vm.authError = response.message;
            });
        }

        // OAuth provider request
        function callOauthProvider(url) {
            if ($state.previous && $state.previous.href) {
                url += '?redirect_to=' + encodeURIComponent($state.previous.href);
            }

            // Effectively call OAuth authentication route:
            $window.location.href = url;
        }

        function getCheckCode() {
            vm.codeUrl = '/api/checkCode?a=' + new Date().getTime();
        }
    }
}());
