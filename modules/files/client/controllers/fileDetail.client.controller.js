/**
 * Created by bournewang on 16/9/14.
 */
(function () {
    'use strict';
    angular.module('files').controller('FileDetailController', FileDetailController);

    /* @ngInject */
    function FileDetailController(fileInfo) {
        var vm = this;
        vm.fileInfo = fileInfo;
        vm.isPicture = isPicture;
        vm.isVideo = isVideo;
        vm.isText = isText;

        function isPicture() {
            return vm.fileInfo.fileType === 'pic';
        }

        function isVideo() {
            return vm.fileInfo.fileType === 'video';
        }

        function isText() {
            return vm.fileInfo.fileType === 'txt';
        }
    }
}());