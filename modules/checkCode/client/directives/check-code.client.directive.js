/**
 * Created by jiangyun on 16/9/9.
 */
(function () {
    'use strict';

    angular.module('core')
        .directive('checkCode', checkCode);

    /* @ngInject */
    function checkCode() {
        var directive = {
            restrict: 'E',
            transclude: true,
            replace: true,
            require: ['ngModel'],
            scope: {
                code: '=ngModel'
            },
            templateUrl: 'modules/checkCode/client/views/check-code.client.view.html',
            controller: CheckCodeController,
            controllerAs: 'dvm'
        };

        return directive;

        /* @ngInject */
        function CheckCodeController($scope) {
            var dvm = this;
            dvm.getCheckCode = getCheckCode;
            getCheckCode();
            function getCheckCode() {
                dvm.codeUrl = '/api/checkCode?a=' + new Date().getTime();
            }
        }
    }
}());
