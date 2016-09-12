/**
 * Created by bournewang on 16/9/7.
 */
(function () {
    'use strict';

    angular
        .module('files')
        .controller('FilesListController', FilesListController);

    /* @ngInject */
    function FilesListController(FileInfoResource, $uibModal, $window, $log) {
        var vm = this;
        let pageSize = 10;

        vm.fileInfos = FileInfoResource.getFileInfo({pageSize: pageSize, pageNum: 0, queryString: '{}'});
        vm.pages = pages;
        vm.remove = remove;
        vm.goPage = goPage;
        vm.open = open;

        function pages() {
            let array = [];
            for (let i = 1; i <= vm.fileInfos.totalPage; i++) {
                array.push(i);
            }
            return array;
        }

        function open() {
            var modalInstance = $uibModal.open({
                templateUrl: 'modules/files/client/views/uploadFile.modal.client.view.html',
                controller: 'FilesController',
                controllerAs: 'vm'
                // size: size,
                // resolve: {
                //     // items: function () {
                //     //     return [1, 2, 3, 4, '1234'];
                //     // }
                // }
            });

            modalInstance.result.then(function (selectedItem) {
                vm.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        function remove(fileInfo, $event) {
            $event.stopPropagation();
            if ($window.confirm('Are you sure you want to delete?')) {
                fileInfo.$delete(function () {
                    vm.fileInfos = FileInfoResource.getFileInfo();
                }, function (e) {
                    console.log(e);
                });
            }
        }

        function goPage(pageNum) {
            vm.fileInfos = FileInfoResource.getFileInfo({
                pageSize: pageSize,
                pageNum: pageNum - 1,
                queryString: '{}'
            });
        }

    }
}());
