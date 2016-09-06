(function () {
    'use strict';

    angular.module('angulr')
        .directive('uiScroll', uiScroll);

    uiScroll.$inject = ['$location', '$anchorScroll'];

    function uiScroll($location, $anchorScroll) {
        var directive = {
            restrict: 'AC',
            link: link
        };

        return directive;

        function link(scope, el, attr) {
            el.on('click', function (e) {
                $location.hash(attr.uiScroll);
                $anchorScroll();
            });
        }
    }
}());
