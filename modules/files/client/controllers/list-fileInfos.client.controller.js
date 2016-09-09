/**
 * Created by bournewang on 16/9/7.
 */
(function () {
    'use strict';

    angular
        .module('files')
        .controller('FilesListController', FilesListController);

    /* @ngInject */
    function FilesListController(FileInfoResource, $state, $window) {
        var vm = this;
        let pageSize = 10;

        vm.fileInfos = FileInfoResource.getFileInfo({pageSize: pageSize, pageNum: 0, queryString: '{}'});
        vm.pages = pages;
        vm.add = add;
        vm.remove = remove;
        vm.goPage = goPage;
        //vm.goDetail = goDetail;

        function pages() {
            let array = [];
            for (let i = 1; i <= vm.fileInfos.totalPage; i++) {
                array.push(i);
            }
            return array;
        }

        function add() {
            var fileInfo = new FileInfoResource();
            fileInfo.name = 'ahaha';
            fileInfo.master = 'wangbo';
            fileInfo.remark = 1;
            fileInfo.type = 'ChineseRuralDog';
            fileInfo.$save(function () {
                vm.fileInfos = FileInfoResource.getFileInfo();
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
            // $event.stopPropagation();
            vm.fileInfos = FileInfoResource.getFileInfo({pageSize: pageSize, pageNum: pageNum, queryString: '{}'});
        }

        //
        //function goDetail(fileInfo) {
        //    $state.go('fileInfos.view', {
        //        fileInfoId: fileInfo._id
        //    });
        //}
    }
}());
