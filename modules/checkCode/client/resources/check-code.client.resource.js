/**
 * Created by jiangyun on 16/9/9.
 */
(function () {
    'use strict';

    angular
        .module('checkCode')
        .factory('CheckCodeResource', CheckCodeResource);

    /* @ngInject */
    function CheckCodeResource(baseResource) {
        var CheckCode = baseResource('/api/checkCode/:width/:height', {}, {
            check: {
                url: '/api/checkCode/check',
                method: 'POST'
            }
        });

        return CheckCode;
    }
}());
