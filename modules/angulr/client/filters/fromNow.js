/* Filters */
// need load the moment.js to use this filter.
(function () {
    'use strict';
    angular.module('angulr')
        .filter('fromNow', fromNow);

    function fromNow() {
        return function (date) {
            return moment(date).fromNow();
        };
    }
}());
