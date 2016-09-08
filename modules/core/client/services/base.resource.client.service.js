/**
 * Created by jiangyun on 16/8/17.
 */
(function () {
    'use strict';

    angular
        .module('core')
        .factory('baseResource', baseResource);

    baseResource.$inject = ['$resource'];

    function baseResource($resource) {
        return function (url, params, methods) {
            methods = methods || {};
            angular.extend(methods, {
                update: {method: 'put'}
            });

            var resource = $resource(url, params, methods);

            angular.extend(resource.prototype, {
                $createOrUpdate: function () {
                    var _baseResource = this;
                    return createOrUpdate(_baseResource);
                }
            });

            return resource;

            function createOrUpdate(baseResource) {
                if (baseResource._id) {
                    return baseResource.$update(onSuccess, onError);
                } else {
                    return baseResource.$save(onSuccess, onError);
                }

                // Handle successful response
                function onSuccess(article) {
                    // Any required internal processing from inside the service, goes here.
                }

                // Handle error response
                function onError(errorResponse) {
                    var error = errorResponse.data;
                    // Handle error internally
                    handleError(error);
                }
            }

            function handleError(error) {
                // Log error
                console.log(error);
            }
        };
    }
}());
