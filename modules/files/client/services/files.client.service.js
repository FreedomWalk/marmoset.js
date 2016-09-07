/**
 * Created by bournewang on 16/9/7.
 */

(function () {
    'use strict';
    angular
        .module('files.services')
        .factory('FilesService', FilesService);

    FilesService.$inject = ['baseResource'];

    function FilesService(baseResource) {
        var File = baseResource('/api/files/:fileId', {
            fileId: '@_id'
        });
        return File;
    }
}());
