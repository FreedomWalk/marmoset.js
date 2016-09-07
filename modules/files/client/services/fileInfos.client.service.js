/**
 * Created by bournewang on 16/9/7.
 */

(function () {
    'use strict';
    angular
        .module('files.services')
        .factory('FileInfosService', FileInfosService);

    FilesService.$inject = ['baseResource'];

    function FileInfosService(baseResource) {
        var FileInfo = baseResource('/api/files/:fileId', {
            fileId: '@_id'
        });
        return File;
    }
}());