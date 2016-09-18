/**
 * Created by bournewang on 16/9/7.
 */
(function () {
    'use strict';

    angular
        .module('files')
        .controller('FilesListController', FilesListController);

    /* @ngInject */
    function FilesListController(FileInfoResource, $uibModal, $window, $filter) {
        var vm = this;
        let pageSize = 10;

        vm.fileInfos = FileInfoResource.getFileInfo({
            pageSize: pageSize,
            pageNum: 0,
            queryString: JSON.stringify({sort: '-created'})
        });
        vm.remove = remove;
        vm.goPage = goPage;
        vm.upload = upload;
        vm.search = search;
        vm.openCalendar = openCalendar;
        vm.changed = changed;
        vm.clear = clear;
        vm.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            class: 'datepicker'
        };
        vm.query = {};
        vm.opened = false;

        function upload() {
            let modalInstance = $uibModal.open({
                templateUrl: 'modules/files/client/views/uploadFile.modal.client.view.html',
                controller: 'FilesController',
                controllerAs: 'vm',
                size: 'lg'
            });

            modalInstance.result.then(function () {
                vm.fileInfos = FileInfoResource.getFileInfo({
                    pageSize: pageSize,
                    pageNum: 0,
                    queryString: JSON.stringify({sort: '-created'})
                });
            }, function () {
                vm.fileInfos = FileInfoResource.getFileInfo({
                    pageSize: pageSize,
                    pageNum: 0,
                    queryString: JSON.stringify({sort: '-created'})
                });
            });
        }

        function remove(fileInfo, $event) {
            $event.stopPropagation();
            if ($window.confirm('确认删除?')) {
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
                queryString: generateQueryString()
            });
        }

        function search() {
            vm.fileInfos = FileInfoResource.getFileInfo({
                pageSize: pageSize,
                pageNum: 0,
                queryString: generateQueryString()
            });
        }

        function generateQueryString() {
            let obj = {sort: '-created'};
            obj.query = format(vm.query);
            return JSON.stringify(obj);
        }

        function openCalendar($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened = true;
        }

        function changed() {
            console.log(vm.mytime);
        }

        function clear() {
            vm.query = {};
        }

        function format(query) {
            let newQuery = {};
            if (query._id) {
                newQuery._id = query._id;
                return newQuery;
            }
            if (query.originName) {
                newQuery.originName = {$regex: query.originName};
            }
            if (query.creator) {
                newQuery.creator = query.creator;
            }
            if (query.minSize || query.maxSize) {
                newQuery.fileSize = {
                    $gte: query.minSize ? query.minSize : undefined,
                    $lte: query.maxSize ? query.maxSize : undefined
                };
            }
            return newQuery;
        }
    }
}());
