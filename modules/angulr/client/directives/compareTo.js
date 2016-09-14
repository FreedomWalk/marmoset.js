/**
 * Created by jiangyun on 16/9/12.
 */
(function () {
    'use strict';

    angular.module('angulr')
        .directive('compareTo', compareTo);

    function compareTo() {
        var directive = {
            require: 'ngModel',
            scope: {
                otherModelValue: '=compareTo'
            },
            link: link
        };

        return directive;

        function link(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue === scope.otherModelValue;
            };

            scope.$watch('otherModelValue', function () {
                ngModel.$validate();
            });
        }
    }
}());
