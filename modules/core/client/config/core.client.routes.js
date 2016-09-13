(function () {
    'use strict';

    angular
        .module('core.routes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.rule(function ($injector, $location) {
            var path = $location.path();
            var hasTrailingSlash = path.length > 1 && path[path.length - 1] === '/';

            if (hasTrailingSlash) {
                // if last character is a slash, return the same url without the slash
                var newPath = path.substr(0, path.length - 1);
                $location.replace().path(newPath);
            }
        });

        // Redirect to 404 when route not found
        $urlRouterProvider.otherwise(function ($injector, $location) {
            var $state = $injector.get('$state');
            if ($location.path() === '/') {
                var Authentication = $injector.get('Authentication');
                if (Authentication.getUser()) {
                    $state.transitionTo('home', null, {
                        location: false
                    });
                } else {
                    $state.transitionTo('access.signin', null, {
                        location: false
                    });
                }
            } else {
                $state.transitionTo('access.error', null, {
                    location: false
                });
            }

        });

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'modules/core/client/views/home.client.view.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            //.state('not-found', {
            //  url: '/not-found',
            //  templateUrl: 'modules/core/client/views/404.client.view.html',
            //  data: {
            //    ignoreState: true,
            //    pageTitle: 'Not-Found'
            //  }
            //})
            .state('bad-request', {
                url: '/bad-request',
                templateUrl: 'modules/core/client/views/400.client.view.html',
                data: {
                    ignoreState: true,
                    pageTitle: 'Bad-Request'
                }
            })
            .state('forbidden', {
                url: '/forbidden',
                templateUrl: 'modules/core/client/views/403.client.view.html',
                data: {
                    ignoreState: true,
                    pageTitle: 'Forbidden'
                }
            });
    }
}());
