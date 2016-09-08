/**
 * Created by bournewang on 16/9/8.
 */

(function () {
    'use strict';
    angular.module('mail.service').factory('MailService', MailService);

    /* @ngInject */
    function MailService(baseResource) {
        let Mail = baseResource('/api/mail/:mailId', {
            mailId: '@_id'
        });
        return Mail;
    }

}());