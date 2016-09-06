(function () {
    'use strict';

    angular.module('angulr')
        .directive('uiModule', uiModule);

    uiModule.$inject = ['MODULE_CONFIG', 'uiLoad', '$compile'];

    function uiModule(MODULE_CONFIG, uiLoad, $compile) {
        var directive = {
            restrict: 'A',
            compile: compile
        };
        return directive;

        function compile(el, attrs) {
            var contents = el.contents().clone();
            return function (scope, el, attrs) {
                el.contents().remove();
                uiLoad.load(MODULE_CONFIG[attrs.uiModule])
                    .then(function () {
                        $compile(contents)(scope, function (clonedElement, scope) {
                            el.append(clonedElement);
                        });
                    });
            }
        }
    }
}());
