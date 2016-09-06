(function () {
    'use strict';

    angular.module('angulr')
        .directive('setNgAnimate', setNgAnimate);

    setNgAnimate.$inject = ['$animate'];

    function setNgAnimate($animate) {
        var directive = {
            link: link
        };

        return directive;

        function link($scope, $element, $attrs) {
            $scope.$watch(function () {
                return $scope.$eval($attrs.setNgAnimate, $scope);
            }, function (valnew, valold) {
                $animate.enabled(!!valnew, $element);
            });
        }
    }
}());
