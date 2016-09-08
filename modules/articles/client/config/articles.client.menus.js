(function () {
    'use strict';

    angular
        .module('articles')
        .run(menuConfig);

    menuConfig.$inject = ['menuService'];

    function menuConfig(menuService) {
        menuService.addMenuItem('topbar', {
            title: 'Articles',
            state: 'articles',
            type: 'dropdown',
            icon: 'fa-keyboard-o',
            class: 'text-primary-dker',
            roles: ['*']
        });

        // Add the dropdown list item
        menuService.addSubMenuItem('topbar', 'articles', {
            title: 'List Articles',
            state: 'articles.list',
            roles: ['*']
        });
    }
}());
