angular.module('resultSetup').component('modalComponent', {
    templateUrl: 'myModalContent.html',
    bindings: {
        resolve: '<'
    }
});

ModalController().$inject = [];

function ModalController() {
}