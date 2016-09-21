/**
 * Created by bournewang on 16/9/14.
 */
(function () {
    'use strict';
    angular.module('files').controller('FileDetailController', FileDetailController);

    /* @ngInject */
    function FileDetailController(fileInfo, $window, FileInfoResource) {
        var vm = this;
        vm.fileInfo = fileInfo;
        vm.isPicture = isPicture;
        vm.isVideo = isVideo;
        vm.remove = remove;
        vm.url = 'api/file/' + vm.fileInfo._id;

        function isPicture() {
            return vm.fileInfo.fileType === 'pic';
        }

        function isVideo() {
            return vm.fileInfo.suffix && vm.fileInfo.suffix.toLowerCase() === 'mp4';
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
