/**
 * Created by bournewang on 16/9/7.
 */
(function () {
    'use strict';

    angular
        .module('fileInfos')
        .controller('PetsListController', FileInfosListController);

    /* @ngInject */
    function FileInfosListController(FileInfosService, $state, $window) {
        var vm = this;

        vm.fileInfos = FileInfosService.query();
        vm.add = add;
        vm.remove = remove;
        vm.update = update;
        //vm.goDetail = goDetail;

        function add() {
            var fileInfo = new FileInfosService();
            fileInfo.name = 'ahaha';
            fileInfo.master = 'wangbo';
            fileInfo.remark = 1;
            fileInfo.type = 'ChineseRuralDog';
            fileInfo.$save(function () {
                vm.fileInfos = FileInfosService.query();
            });
        }

        function remove(fileInfo, $event) {
            $event.stopPropagation();
            if ($window.confirm('Are you sure you want to delete?')) {
                fileInfo.$delete(function () {
                    vm.fileInfos = FileInfosService.query();
                }, function (e) {
                    console.log(e);
                });
            }
        }

        function update(fileInfo, $event) {
            $event.stopPropagation();
            fileInfo.remark = parseInt(Math.random() * 100, 10);
            fileInfo.$update(function () {
                vm.fileInfos = FileInfosService.query();
            });
        }
        //
        //function goDetail(fileInfo) {
        //    $state.go('fileInfos.view', {
        //        fileInfoId: fileInfo._id
        //    });
        //}
    }
}());
