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
                if (rejection.status === 500) {
                    $injector.get('toastr').error(rejection.data.message, '错误信息');
                } else if (rejection.status === 401) {
                    Authentication.removeUser();
                    $injector.get('$state').transitionTo('access.error', {
                        code: rejection.status, message: rejection.data.message
                    });
                } else {
                    if (rejection.status !== 200) {
                        $injector.get('$state').transitionTo('access.error', {
                            code: rejection.status, message: rejection.data.message
                        });
                    }
                }
            }
            // otherwise, default behaviour
            return $q.reject(rejection);
        }
    }
}());
