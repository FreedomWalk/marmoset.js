/**
 * Created by jiangyun on 16/9/2.
 */
(function () {
    'use strict';

    angular
        .module('file')
        .factory('FileResource', FileResource);

    FileResource.$inject = ['baseResource'];

    function FileResource(baseResource) {
        var File = baseResource('/api/file/:fileId', {fileId: '@_id'}, {
            upload: {
                url: '/api/file',
                method: 'POST'
            },
            getFile: {
                url: '/api/file/:fileId',
                method: 'GET'
            },
            getPicture: {
                url: '/api/pic/:fileId',
                method: 'GET'
            },
            getPictureByZoom: {
                url: '/api/pic/zoom/:width/:height/:fileId',
                method: 'GET'
            },
            getPictureByZoomWidth: {
                url: '/api/pic/zoomByWidth/:width/:fileId',
                method: 'GET'
            },
            getPictureByZoomHeight: {
                url: '/api/pic/zoomByHeight/:height/:fileId',
                method: 'GET'
            }
        });

        return File;
    }
}());
