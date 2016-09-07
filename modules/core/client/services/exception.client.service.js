/**
 * Created by jiangyun on 16/8/30.
 */
(function () {
    'use strict';

    angular
        .module('core')
        .factory('exception', exception);

    exception.$inject = ['logger'];

    function exception(logger) {
        var service = {
            catcher: catcher
        };
        return service;

        function catcher(message) {
            return function (reason) {
                logger.error(message, reason);
            };
        }
    }
}());
