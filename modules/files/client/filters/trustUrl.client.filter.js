/**
 * Created by bournewang on 16/9/14.
 */
(function () {
    'use strict';

    angular.module('files')
        .filter('trustUrl', trustUrl);

    /* @ngInject */
    function trustUrl($sce) {
        return function (trustUrl) {
            return $sce.trustAsResourceUrl(trustUrl);
        };
    }
}());
