(function () {
    'use strict';

    angular
        .module('core')
        .run(routeFilter);

    routeFilter.$inject = ['$rootScope', '$state', 'Authentication', '$log'];

    function routeFilter($rootScope, $state, Authentication, $log) {
        $rootScope.$on('$stateChangeStart', stateChangeStart);
        $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);
        $rootScope.$on('$stateChangeError', function () {
            $log.debug('ddd');
        });

        function stateChangeStart(event, toState, toParams, fromState, fromParams) {
            if (!angular.isObject(Authentication.getUser())) {
                if (toState.name.indexOf('access') === -1) {
                    event.preventDefault();
                    $state.transitionTo('access.signin');
                    return;
                }
            } else {
                if (toState.name.indexOf('access') === -1) {
                    if (Authentication.getUser().isLock) {
                        event.preventDefault();
                        $state.transitionTo('access.lock');
                    }
                }
            }
            // Check authentication before changing state
            if (toState.data && toState.data.roles && toState.data.roles.length > 0) {
                var allowed = false;
                var user = Authentication.getUser();
                for (var i = 0, roles = toState.data.roles; i < roles.length; i++) {
                    if ((roles[i] === 'guest') || (user && user.roles !== undefined && user.roles.indexOf(roles[i]) !== -1)) {
                        allowed = true;
                        break;
                    }
                }

                if (!allowed) {
                    event.preventDefault();
                    if (user !== undefined && typeof user === 'object') {
                        $state.transitionTo('forbidden');
                    } else {
                        $state.go('access.signin').then(function () {
                            // Record previous state
                            storePreviousState(toState, toParams);
                        });
                    }
                }
            }
        }

        function stateChangeSuccess(event, toState, toParams, fromState, fromParams) {
            // Record previous state
            storePreviousState(fromState, fromParams);
        }

        // Store previous state
        function storePreviousState(state, params) {
            // only store this state if it shouldn't be ignored
            if (!state.data || !state.data.ignoreState) {
                $state.previous = {
                    state: state,
                    params: params,
                    href: $state.href(state, params)
                };
            }
        }
    }
}());
