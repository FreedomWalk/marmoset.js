/**
 * Created by jiangyun on 16/8/11.
 */
(function () {
    'use strict';

    // Authentication service for user variables

    angular
        .module('core')
        .factory('jwtInterceptor', jwtInterceptor);

    /* @ngInject */
    function jwtInterceptor($log, $sessionStorage) {
        var _token;

        function request(config) {
            // do something on success
            if ($sessionStorage.token) {
                config.headers.Authorization = $sessionStorage.token;
            }
            $log.debug(config);
            return config;
        }

        function response(config) {
            // do something on success
            var token = config.headers().authorization;
            if (token !== undefined) {
                $sessionStorage.token = token;
            }
            $log.debug(config);
            return config;
        }

        return {
            request: request,
            response: response
        };
    }
}());
