/**
 * Created by bournewang on 16/9/7.
 */
(function () {
    'use strict';

    angular
        .module('files')
        .run(menuConfig);

    menuConfig.$inject = ['menuService'];

    function menuConfig(menuService) {
        menuService.addMenuItem('topbar', {
            title: 'Files',
            state: 'files',
            type: 'dropdown',
            icon: 'fa-paw',
            class: 'text-success',
            roles: ['*']
        });

        // Add the dropdown list item
        menuService.addSubMenuItem('topbar', 'files', {
            title: 'List Files',
            state: 'fileInfos.list',
            roles: ['*']
        });
    }
}());
