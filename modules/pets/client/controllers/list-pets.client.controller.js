/**
 * Created by jiangyun on 16/8/4.
 */
(function () {
    'use strict';

    angular
        .module('pets')
        .controller('PetsListController', PetsListController);

    /* @ngInject */
    function PetsListController(PetsService, $state, $window) {
        var vm = this;
        var pageSize = 10;
        vm.maxSize = 20;

        goPage(1);
        vm.add = add;
        vm.remove = remove;
        vm.update = update;
        vm.goPage = goPage;

        function add() {
            var pet = new PetsService();
            pet.name = 'ahaha';
            pet.master = 'wangbo';
            pet.remark = 1;
            pet.type = 'ChineseRuralDog';
            pet.$save(function () {
                goPage(1);
            });
        }

        function remove(pet, $event) {
            $event.stopPropagation();
            if ($window.confirm('Are you sure you want to delete?')) {
                pet.$delete(function () {
                    vm.pets = PetsService.query();
                }, function (e) {
                    console.log(e);
                });
            }
        }

        function update(pet, $event) {
            $event.stopPropagation();
            pet.remark = parseInt(Math.random() * 100, 10);
            pet.$update(function () {
                vm.pets = PetsService.query();
            });
        }

        function goPage(pageNum) {
            vm.pets = PetsService.pageList({
                pageSize: pageSize,
                pageNum: pageNum - 1,
                queryString: '{}'
            });
        }
    }
}());
