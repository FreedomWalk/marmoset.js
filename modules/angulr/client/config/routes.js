/**
 * Created by jiangyun on 16/8/19.
 */
(function () {
    'use strict';

    angular
        .module('pets.routes')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper, $ocLazyLoad) {
        routerHelper.configureStates(getStates());
        $ocLazyLoad.load('toastr');
    }

    function getStates() {
        return [
            {
                state: 'access',
                config: {
                    url: '/access',
                    abstract: true,
                    views: {
                        'access': {
                            template: '<div ui-view class="fade-in-right-big smooth"></div>'
                        }
                    }
                }
            }, {
                state: 'access.signin',
                config: {
                    url: '/signin',
                    templateUrl: 'modules/angulr/client/views/page_signin.html',
                    controller: 'AuthenticationController',
                    controllerAs: 'vm'
                }
            }, {
                state: 'access.signup',
                config: {
                    url: '/signup',
                    templateUrl: 'modules/angulr/client/views/page_signup.html',
                    controller: 'AuthenticationController',
                    controllerAs: 'vm'
                }
            }, {
                state: 'access.forgotpwd',
                config: {
                    url: '/forgotpwd',
                    templateUrl: 'modules/angulr/client/views/page_forgotpwd.html',
                    controller: 'PasswordController',
                    controllerAs: 'vm'
                }
            }, {
                state: 'access.resetpwd',
                config: {
                    url: '/resetpwd/:token',
                    templateUrl: 'modules/angulr/client/views/page_reset_password.html',
                    controller: 'PasswordController',
                    controllerAs: 'vm'
                }
            }, {
                state: 'access.404',
                config: {
                    url: '/404/:code',
                    templateUrl: 'modules/angulr/client/views/page_404.html',
                    controller: 'StatusErrorController',
                    controllerAs: 'vm'
                },
                params: {
                    code: null,
                    message: ''
                }
            }, {
                state: 'access.lock',
                config: {
                    url: '/lock',
                    templateUrl: 'modules/angulr/client/views/page_lockme.html',
                    controller: 'PageLockController',
                    controllerAs: 'vm',
                    resolve: {
                        /* @ngInject */
                        removeUser: function (Authentication) {
                            var user = Authentication.getUser();
                            user.isLock = true;
                            Authentication.setUser(user);
                        }
                    }
                }
            }
        ];
    }
}());
