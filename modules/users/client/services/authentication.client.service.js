(function () {
    'use strict';

    // Authentication service for user variables

    angular
        .module('users.services')
        .factory('Authentication', Authentication);

    /* @ngInject */
    function Authentication($sessionStorage, $window) {
        var SECRET_STR = 'Cambio Secret';

        return {
            getUser: getUser,
            setUser: setUser,
            removeUser: removeUser
        };

        function getUser() {
            if ($sessionStorage.user !== undefined) {
                var decryptObj = $window.CryptoJS.AES.decrypt($sessionStorage.user, SECRET_STR);
                var decryptStr = decryptObj.toString($window.CryptoJS.enc.Utf8);
                return angular.fromJson(decryptStr);
            }
        }

        function setUser(user) {
            var jsonStr = angular.toJson(user);
            var decryptObj = $window.CryptoJS.AES.encrypt(jsonStr, SECRET_STR);
            $sessionStorage.user = decryptObj.toString();
        }

        function removeUser() {
            delete $sessionStorage.user;
        }
    }
}());
