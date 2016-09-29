/**
 * Created by jiangyun on 16/9/9.
 */
(function () {
    'use strict';

    angular.module('core')
        .directive('checkCode', checkCode);

    /* @ngInject */
    function checkCode() {
        return {
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

        /* @ngInject */
        function CheckCodeController($http) {
            var dvm = this;
            dvm.getCheckCode = getCheckCode;
            getCheckCode();

            function getCheckCode() {
                $http({
                    url: '/api/checkCode',
                    method: 'GET'
                }).success(function (data) {
                    dvm.codeUrl = data.imgUrl;
                }).error(function (data, header, config, status) {
                    // dvm.codeUrl = errorImg;
                });
            }
        }
    }
}());
