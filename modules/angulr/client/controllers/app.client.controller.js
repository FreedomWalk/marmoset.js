(function () {
    'use strict';

    angular.module('angulr')
        .controller('AppCtrl', AppCtrl);

    /* @ngInject */
    function AppCtrl($scope, $translate, $localStorage, $window, Authentication, $state, menuService, $location) {
        // add 'ie' classes to html
        var vm = this;
        var isIE = !!navigator.userAgent.match(/MSIE/i);
        isIE && angular.element($window.document.body).addClass('ie');
        isSmartDevice() && angular.element($window.document.body).addClass('smart');
        // config
        vm.app = {
            name: 'Cambio',
            version: '1.3.3',
            // for chart colors
            color: {
                primary: '#7266ba',
                info: '#23b7e5',
                success: '#27c24c',
                warning: '#fad733',
                danger: '#f05050',
                light: '#e8eff0',
                dark: '#3a3f51',
                black: '#1c2b36'
            },
            settings: {
                themeID: 1,
                navbarHeaderColor: 'bg-black',
                navbarCollapseColor: 'bg-white-only',
                asideColor: 'bg-black',
                headerFixed: true,
                asideFixed: false,
                asideFolded: false,
                asideDock: false,
                container: false
            }
        };

        vm.authentication = Authentication;
        vm.accountMenu = menuService.getMenu('account').items[0];
        vm.menu = menuService.getMenu('topbar');
        vm.signout = signout;
        vm.isAccess = isAccess;
        vm.setLang = setLang;
        // save settings to local storage
        if (angular.isDefined($localStorage.settings)) {
            vm.app.settings = $localStorage.settings;
        } else {
            $localStorage.settings = vm.app.settings;
        }

        $scope.$watch('vm.app.settings', function () {
            if (vm.app.settings.asideDock && vm.app.settings.asideFixed) {
                // aside dock and fixed must set the header fixed.
                vm.app.settings.headerFixed = true;
            }
            // save to local storage
            $localStorage.settings = vm.app.settings;
        }, true);

        // angular translate
        vm.lang = {isopen: false};
        vm.langs = {zh_cn: '简体中文', en: 'English', de_DE: 'German', it_IT: 'Italian'};
        vm.selectLang = vm.langs[$translate.proposedLanguage()] || "English";
        function setLang(langKey, $event) {
            // set the current lang
            vm.selectLang = vm.langs[langKey];
            // You can change the language during runtime
            $translate.use(langKey);
            vm.lang.isopen = !vm.lang.isopen;
        }

        function isSmartDevice() {
            // Adapted from http://www.detectmobilebrowsers.com
            var ua = $window.navigator.userAgent || $window.navigator.vendor || $window.opera;
            // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

        function isAccess() {
            return $state.includes("access");
        }

        function signout() {
            vm.authentication.removeUser();
            $location.path('/');
        }

    }
}());
