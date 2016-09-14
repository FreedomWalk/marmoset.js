/**
 * Created by bournewang on 16/9/14.
 */
(function () {
    'use strict';

    angular.module('files')
        .filter('filesize', filesize);

    /* @ngInject */
    function filesize() {
        return function (filesize) {
            if (angular.isNumber(filesize)) {
                let formats = {
                    'Byte': Math.pow(2, 0),
                    'KB': Math.pow(2, 10),
                    'MB': Math.pow(2, 20),
                    'GB': Math.pow(2, 30),
                    'TB': Math.pow(2, 40),
                    'PB': Math.pow(2, 50),
                    'EB': Math.pow(2, 60),
                    'ZB': Math.pow(2, 70),
                    'YB': Math.pow(2, 80),
                    'BB': Math.pow(2, 90)
                };

                for (let k in formats) {
                    if ({}.hasOwnProperty.call(formats, k)) {
                        let v = formats[k];
                        let r = filesize / v;
                        if (r >= 1 && r < 1000) {
                            return r.toFixed(2) + ' ' + k;
                        }
                    }
                }
            } else {
                return '0 Byte';
            }
        };
    }
}());
