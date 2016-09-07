/**
 * Created by bournewang on 16/9/7.
 */
(function () {
    'use strict';

    angular
        .module('files.routes')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'files',
                config: {
                    abstract: true,
                    url: '/files',
                    template: '<ui-view/>'
                }
            }, {
                state: 'fileInfos.list',
                config: {
                    url: '',
                    templateUrl: 'modules/files/client/views/list-fileInfos.client.view.html',
                    controller: 'FilesListController',
                    controllerAs: 'vm',
                    data: {
                        pageTitle: 'FileInfos List'
                    }
                }
            }
        ];
    }

    /* @ngInject */
    function getFile($stateParams, FilesService) {
        return FilesService.get({
            fileId: $stateParams.fileId
        }).$promise;
    }

    /* @ngInject */
    function uiSelectLoad($ocLazyLoad) {
        return $ocLazyLoad.load('ui.select');
    }

    /* @ngInject */
    function getFileService(FilesService) {
        return new FilesService();
    }

}());
