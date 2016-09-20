/**
 * Created by bournewang on 16/9/14.
 */
(function () {
    'use strict';
    angular.module('files').controller('FileDetailController', FileDetailController);

    /* @ngInject */
    function FileDetailController(fileInfo, $window, FileInfoResource, $state) {
        var vm = this;
        vm.fileInfo = fileInfo;
        vm.isPicture = isPicture;
        vm.isVideo = isVideo;
        vm.remove = remove;

        function isPicture() {
            return vm.fileInfo.fileType === 'pic';
        }

        function isVideo() {
            return vm.fileInfo.fileType === 'video';
        }

        function remove($event) {
            $event.stopPropagation();
            if ($window.confirm('确认删除?')) {
                FileInfoResource.delete({fileId: fileInfo._id}, function () {
                    history.back();
                });
            }
        }
    }
}());