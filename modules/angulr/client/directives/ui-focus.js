(function () {
    'use strict';

    angular.module('angulr')
        .directive('uiFocus', uiFocus);

    uiFocus.$inject = ['$timeout', '$parse'];

    function uiFocus($timeout, $parse) {
        var directive = {
            link: link
        };

        return directive;

        function link(scope, element, attr) {
            var model = $parse(attr.uiFocus);
            scope.$watch(model, function (value) {
                if (value === true) {
                    $timeout(function () {
                        element[0].focus();
                    });
                }
            });
            element.bind('blur', function () {
                scope.$apply(model.assign(scope, false));
            });
        }
    }
}());
