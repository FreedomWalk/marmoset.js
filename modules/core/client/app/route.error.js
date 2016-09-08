/**
 * Created by jiangyun on 16/8/30.
 */

(function (app) {
    'use strict';

    angular
        .module('core.routes')
        .run(handleRoutingErrors);
    var handlingRouteChangeError = false;

    handleRoutingErrors.$inject = ['$rootScope', '$log', '$location'];

    function handleRoutingErrors($rootScope, $log, $location) {
        /**
         * Route cancellation:
         * On routing error, go to the dashboard.
         * Provide an exit clause if it tries to do it twice.
         */
        $rootScope.$on('$routeChangeError',
            function (event, current, previous, rejection) {
                if (handlingRouteChangeError) {
                    return;
                }
                handlingRouteChangeError = true;
                var destination = (current && (current.title ||
                    current.name || current.loadedTemplateUrl)) ||
                    'unknown target';
                var msg = 'Error routing to ' + destination + '. ' +
                    (rejection.msg || '');

                /**
                 * Optionally log using a custom service or $log.
                 * (Don't forget to inject custom service)
                 */
                $log.warning(msg, [current]);

                /**
                 * On routing error, go to another route/state.
                 */
                $location.path('/');

            }
        );
    }
}());
