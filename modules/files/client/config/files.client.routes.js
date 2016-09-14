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
                state: 'files.list',
                config: {
                    url: '',
                    templateUrl: 'modules/files/client/views/list-fileInfos.client.view.html',
                    controller: 'FilesListController',
                    controllerAs: 'vm',
                    data: {
                        pageTitle: 'FileInfos List'
                    }
                }
            }, {
                state: 'files.detail',
                config: {
                    url: '/detail/:fileId/',
                    templateUrl: 'modules/files/client/views/view-file.client.view.html',
                    controller: 'FileDetailController',
                    controllerAs: 'vm',
                    resolve: {
                        fileInfo: getFileInfo
                    }
                }
            }
        ];
    }

    /* @ngInject */
    function getFileInfo($stateParams, FileInfoResource) {
       return FileInfoResource.get({
           fileId: $stateParams.fileId
       }).$promise;
    }
    //
    ///* @ngInject */
    //function uiSelectLoad($ocLazyLoad) {
    //    return $ocLazyLoad.load('ui.select');
    //}
    //
    ///* @ngInject */
    //function getFileService(FilesService) {
    //    return new FilesService();
    //}

}());
