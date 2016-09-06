// config
(function () {
    'use strict';

    angular.module('angulr')
        .config(['$translateProvider', function ($translateProvider) {
            // Register a loader for the static files
            // So, the module will search missing translation tables under the specified urls.
            // Those urls are [prefix][langKey][suffix].
            $translateProvider.useStaticFilesLoader({
                prefix: 'l10n/',
                suffix: '.json'
            });
            // Tell the module what language to use by default
            $translateProvider.preferredLanguage('zh_cn');
            // Tell the module to store the language in the local storage
            $translateProvider.useLocalStorage();

            $translateProvider.useSanitizeValueStrategy('escape');
        }]);
}());
