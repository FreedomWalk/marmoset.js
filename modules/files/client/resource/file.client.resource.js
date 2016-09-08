/**
 * Created by jiangyun on 16/9/2.
 */
(function () {
    'use strict';

    angular
        .module('files')
        .factory('FileResource', FileResource);

    /* @ngInject */
    function FileResource(baseResource) {
        var File = baseResource('/api/file/:fileId', {fileId: '@_id'}, {
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
