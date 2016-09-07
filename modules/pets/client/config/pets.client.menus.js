/**
 * Created by jiangyun on 16/8/2.
 */
(function () {
    'use strict';

    angular
        .module('pets')
        .run(menuConfig);

    menuConfig.$inject = ['menuService'];

    function menuConfig(menuService) {
        menuService.addMenuItem('topbar', {
            title: 'Pets',
            state: 'pets',
            type: 'dropdown',
            icon: 'fa-paw',
            class: 'text-success',
            roles: ['*']
        });

        // Add the dropdown list item
        menuService.addSubMenuItem('topbar', 'pets', {
            title: 'List Pets',
            state: 'pets.list',
            roles: ['*']
        });
    }
}());
