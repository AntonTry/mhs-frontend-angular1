(function () {
    angular
        .module('resultSetup')
        .component('endRoundModal', {
            templateUrl: 'admin/round-type/end-round-modal/end-round-modal.html',
            bindings: {
                resolve: '<',
                close: '&',
                dismiss: '&'
            },
            controller: EndRoundModal
        });

    EndRoundModal.$inject = [];

    function EndRoundModal() {
        let vm = this;

        vm.$onInit = onInit;

        function onInit() {
        }

        vm.ok = function () {
            console.log()
            // vm.close.closeRound();
            // vm.close({closeRound: closeRound()})
            // vm.close.closeRound();
            // vm.resolve.padla();
        };

        vm.cancel = function () {
            vm.dismiss({$value: 'cancel'});
        };
    }
})();