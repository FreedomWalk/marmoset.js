(function () {
    'use strict';

    angular.module('angulr')
        .directive('uiButterbar', uiButterbar);

    uiButterbar.$inject = ['$rootScope', '$anchorScroll'];

    function uiButterbar($rootScope, $anchorScroll) {
        var directive = {
            restrict: 'AC',
            template: '<span class="bar"></span>',
            link: link
        };

        return directive;

        function link(scope, el, attrs) {
            el.addClass('butterbar hide');
            scope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
                $anchorScroll();
                el.removeClass('hide').addClass('active');
            });
            scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
                event.targetScope.$watch('$viewContentLoaded', function () {
                    el.addClass('hide').removeClass('active');
                });
            });
        }
    }
}());
