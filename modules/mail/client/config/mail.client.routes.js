/**
 * Created by bournewang on 16/9/8.
 */
(function () {
    'use strict';
    angular
        .module('mails')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'mails',
                config: {
                    abstract: true,
                    url: '/mails',
                    template: '<ui-view/>'
                }
            }, {
                state: 'mails.send',
                config: {
                    url: '',
                    templateUrl: 'modules/mail/views/mail-send.client.view.html',
                    controller: 'MailsController',
                    controllerAs: 'vm',
                    data: {
                        pageTitle: 'Send Mails'
                    }
                }
            }
        ];
    }
}());
