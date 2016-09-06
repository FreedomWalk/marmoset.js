(function () {
    'use strict';

    // Authentication service for user variables

    angular
        .module('users.services')
        .factory('Authentication', Authentication);

    Authentication.$inject = ['$sessionStorage'];

    function Authentication($sessionStorage) {

        return {
            getUser: getUser,
            setUser: setUser,
            removeUser: removeUser
        };

        function getUser() {
            if($sessionStorage.user !=undefined){
                return angular.fromJson(CryptoJS.AES.decrypt($sessionStorage.user, "Cambio Secret").toString(CryptoJS.enc.Utf8));
            }
        }

        function setUser(user) {
            $sessionStorage.user = CryptoJS.AES.encrypt(angular.toJson(user), "Cambio Secret").toString();
        }

        function removeUser() {
            delete $sessionStorage.user;
        }
    }
}());
