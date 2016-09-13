/**
 * Created by jiangyun on 16/9/13.
 */
(function () {
    'use strict';

    // Create the Socket.io wrapper service
    angular
        .module('files')
        .service('FileService', FileService);

    /* @ngInject */
    function FileService($window) {

        var service = this;
        service.dataUrlToBlob = dataUrlToBlob;

        function dataUrlToBlob(dataUrl, name) {
            var arr = dataUrl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bStr = atob(arr[1]),
                n = bStr.length,
                u8arr = new $window.Uint8Array(n);
            while (n--) {
                u8arr[n] = bStr.charCodeAt(n);
            }
            var blob = new window.Blob([u8arr], {type: mime});
            blob.name = name;
            return blob;
        }
    }
}());
