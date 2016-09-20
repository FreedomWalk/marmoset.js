/**
 * Created by bournewang on 16/9/9.
 */
(function () {
    'use strict';
    angular.module('files').controller('FilesController', FilesController);

    /* @ngInject */
    function FilesController(FileUploader, $uibModalInstance) {
        var vm = this;
        vm.uploader = new FileUploader({
            url: '/api/file'
        });

        vm.done = done;

        // var uploader = $scope.uploader = new FileUploader({
        //     url: 'js/controllers/upload.php'
        // });

        // CALLBACKS

        vm.uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        vm.uploader.onAfterAddingFile = function (fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        vm.uploader.onAfterAddingAll = function (addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        vm.uploader.onBeforeUploadItem = function (item) {
            console.info('onBeforeUploadItem', item);
        };
        vm.uploader.onProgressItem = function (fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        vm.uploader.onProgressAll = function (progress) {
            console.info('onProgressAll', progress);
        };
        vm.uploader.onSuccessItem = function (fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        vm.uploader.onErrorItem = function (fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        vm.uploader.onCancelItem = function (fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        vm.uploader.onCompleteItem = function (fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        vm.uploader.onCompleteAll = function () {
            console.info('onCompleteAll');
        };

        console.info('uploader', vm.uploader);

        function done() {
            $uibModalInstance.close();
        }
    }

}());
