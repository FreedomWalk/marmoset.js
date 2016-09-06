(function () {
    'use strict';

    angular.module('angulr')
        .directive('uiFullscreen', uiFullscreen);

    uiFullscreen.$inject = ['uiLoad', '$document', '$window'];

    function uiFullscreen(uiLoad, $document, $window) {
        var directive = {
            restrict: 'AC',
            template: '<i class="fa fa-expand fa-fw text"></i><i class="fa fa-compress fa-fw text-active"></i>',
            link: link
        };

        return directive;

        function link(scope, el, attr) {
            el.addClass('hide');
            uiLoad.load('vendor/libs/screenfull.min.js').then(function () {
                // disable on ie11
                if ($window.screenfull.enabled && !navigator.userAgent.match(/Trident.*rv:11\./)) {
                    el.removeClass('hide');
                }
                el.on('click', function () {
                    var target;
                    attr.target && (target = $(attr.target)[0]);
                    $window.screenfull.toggle(target);
                });
                $document.on($window.screenfull.raw.fullscreenchange, function () {
                    if ($window.screenfull.isFullscreen) {
                        el.addClass('active');
                    } else {
                        el.removeClass('active');
                    }
                });
            });
        }
    }
}());
