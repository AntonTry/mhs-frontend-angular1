angular
    .module('game-list')
    .component('modalComponent', {
        templateUrl: 'myModalContent.html',
        bindings: {
            resolve: '<'
        },
        controller: function () {
            let $ctrl = this;

            $ctrl.$onInit = function () {
                $ctrl.items = $ctrl.resolve.items;
                $ctrl.date = $ctrl.resolve.date;
            };
        }
    });