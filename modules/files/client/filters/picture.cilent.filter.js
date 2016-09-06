/**
 * Created by jiangyun on 16/9/2.
 */
(function () {
    'use strict';

    angular.module('file')
        .filter('picture', picture);

    /* @ngInject */
    function picture() {
        return function (picture) {
            if (angular.isString(picture) && picture !== '') {
                if (picture.match('^http://')) {
                    return picture;
                } else {
                    return 'api/pic/' + picture;
                }
            } else {
                return 'modules/users/client/img/profile/default.png';
            }
        };
    }
}());
