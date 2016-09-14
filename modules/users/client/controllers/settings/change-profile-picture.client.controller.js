(function () {
    'use strict';

    angular
        .module('users')
        .controller('ChangeProfilePictureController', ChangeProfilePictureController);

    /* @ngInject */
    function ChangeProfilePictureController($scope, $timeout, $window, Authentication, FileUploader, $sessionStorage,
                                            FileService) {
        var vm = this;

        vm.user = Authentication.getUser();
        vm.imageURL = vm.user.profileImageURL;
        vm.uploadProfilePicture = uploadProfilePicture;
        vm.isUpoading = false;

        vm.cancelUpload = cancelUpload;
        initUploader();

        // Create file uploader instance
        function initUploader() {
            vm.uploader = new FileUploader({
                url: '/api/file',
                alias: 'file',
                headers: {
                    Authorization: $sessionStorage.token
                },
                onAfterAddingFile: onAfterAddingFile,
                onSuccessItem: onSuccessItem,
                onErrorItem: onErrorItem
            });

            // Set file uploader image filter
            vm.uploader.filters.push({
                name: 'imageFilter',
                fn: function (item, options) {
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            });
        }

        // Called after the user selected a new picture file
        function onAfterAddingFile(fileItem) {
            if ($window.FileReader) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL(fileItem._file);

                fileReader.onload = function (fileReaderEvent) {
                    $timeout(function () {
                        vm.selectPicture = fileReaderEvent.target.result;
                    }, 0);
                    vm.isUpoading = true;
                };
            }
        }

        // Called after the user has successfully uploaded a new picture
        function onSuccessItem(fileItem, response, status, headers) {
            // Show success message
            vm.success = true;

            // Populate user object
            vm.user.profileImageURL = response._id;
            Authentication.setUser(vm.user);
            vm.user = Authentication.getUser();

            // Clear upload buttons
            cancelUpload();
        }

        // Called after the user has failed to uploaded a new picture
        function onErrorItem(fileItem, response, status, headers) {
            // Clear upload buttons
            cancelUpload();

            // Show error message
            vm.error = response.message;
        }

        // Change user profile picture
        function uploadProfilePicture() {
            var blob = FileService.dataUrlToBlob(vm.imageURL, vm.user._id + '_profileImage.png');
            vm.uploader.addToQueue([blob]);
            // Clear messages
            vm.success = vm.error = null;
            // Start upload
            vm.uploader.uploadItem(vm.uploader.queue[1]);
        }

        // Cancel the upload process
        function cancelUpload() {
            vm.uploader.clearQueue();
            vm.imageURL = vm.user.profileImageURL;
            vm.selectPicture = null;
            vm.isUpoading = false;
        }
    }
}());
