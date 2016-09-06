(function () {
    'use strict';

    angular
        .module('core')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$q', '$injector', 'Authentication'];

    function authInterceptor($q, $injector, Authentication) {
        var service = {
            responseError: responseError
        };

        return service;

        function responseError(rejection) {
            if (!rejection.config.ignoreAuthModule) {
                switch (rejection.status) {
                    case 401:
                        // Deauthenticate the global user
                        Authentication.removeUser();
                        $injector.get('$state').transitionTo('access.404', {
                            status: 401, message: ''
                        });
                        break;
                    case 403:
                        $injector.get('$state').transitionTo('forbidden');
                        break;
                    case 404:
                        $injector.get('$state').transitionTo('access.404', {
                            status: 404, message: ''
                        });
                        break;
                    case 500:
                        $injector.get('toastr').error(rejection.data.message, '错误信息');
                        break;
                }
            }
            // otherwise, default behaviour
            return $q.reject(rejection);
        }
    }
}());
