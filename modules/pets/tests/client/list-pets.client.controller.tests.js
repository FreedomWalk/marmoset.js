/**
 * Created by jiangyun on 16/9/7.
 */
(function () {
    'use strict';
    describe('PetsListController', function () {
        // Initialize global variables
        var PetsListController,
            $scope,
            Authentication,
            PetsService,
            $state,
            $window,
            $httpBackend;

        beforeEach(function () {
            jasmine.addMatchers({
                toEqualData: function (util, customEqualityTesters) {
                    return {
                        compare: function (actual, expected) {
                            return {
                                pass: angular.equals(actual, expected)
                            };
                        }
                    };
                }
            });
        });

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
        // This allows us to inject a service but then attach it to a variable
        // with the same name as the service.
        beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, _Authentication_, _UsersService_) {
            // Set a new global scope
            $scope = $rootScope.$new();

            // Point global variables to injected services
            $httpBackend = _$httpBackend_;
            Authentication = _Authentication_;

            // Mock logged in user
            Authentication.setUser({
                _id: '525a8422f6d0f87f0e407a33',
                username: 'test',
                roles: ['user']
            });

            // Initialize the Articles controller.
            PetsListController = $controller('EditProfileController as vm', {
                $scope: $scope
            });
        }));

        describe('Random add in user', function () {
            it('should have user context', inject(function (UsersService) {
                expect($scope.vm.user).toBe(Authentication.getUser());
            }));

            it('should update the user profile', inject(function (UsersService) {
                // Set PUT response
                $httpBackend.expectPUT(/api\/users/).respond();

                // Run controller functionality
                $scope.vm.updateUserProfile(true);
                $httpBackend.flush();

                expect($scope.vm.success).toBe(true);
            }));

            it('should set vm.error if error', inject(function (UsersService) {
                var errorMessage = 'error';
                $httpBackend.expectPUT(/api\/users/).respond(400, {
                    message: errorMessage
                });

                $scope.vm.updateUserProfile(true);
                $httpBackend.flush();

                expect($scope.vm.error).toBe(errorMessage);
            }));
        });
    });
}());
