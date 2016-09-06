/**
 * Created by jiangyun on 16/8/2.
 */
(function () {
    'use strict';

    angular
        .module('pets.routes')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'pets',
                config: {
                    abstract: true,
                    url: '/pets',
                    template: '<ui-view/>'
                }
            }, {
                state: 'pets.list',
                config: {
                    url: '',
                    templateUrl: 'modules/pets/client/views/list-pets.client.view.html',
                    controller: 'PetsListController',
                    controllerAs: 'vm',
                    data: {
                        pageTitle: 'Pets List'
                    }
                }
            }, {
                state: 'pets.create',
                config: {
                    url: '/create',
                    templateUrl: 'modules/pets/client/views/form-pet.client.view.html',
                    controller: 'PetController',
                    controllerAs: 'vm',
                    resolve: {
                        petResolve: function (PetsService) {
                            return new PetsService();
                        },
                        deps: uiSelectLoad
                    }
                }
            }, {
                state: 'pets.update',
                config: {
                    url: '/update/:petId',
                    templateUrl: 'modules/pets/client/views/form-pet.client.view.html',
                    controller: 'PetController',
                    controllerAs: 'vm',
                    resolve: {
                        petResolve: getPet,
                        deps: uiSelectLoad
                    }
                }
            }
        ];
    }

    /* @ngInject */
    function getPet($stateParams, PetsService) {
        return PetsService.get({
            petId: $stateParams.petId
        }).$promise;
    }

    /* @ngInject */
    function uiSelectLoad($ocLazyLoad) {
        return $ocLazyLoad.load('ui.select');
    }

}());
