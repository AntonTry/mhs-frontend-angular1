angular.module('roundBuilder')
    .component('roundBuilder', {
        templateUrl: 'admin/round-builder/round-builder.html',
        css: 'admin/round-builder/round-builder.css',
        controller: roundBuilder,
        bindings: {
            rounds: '='
        },
    });

roundBuilder.$inject = [];

function roundBuilder(){
    let vm = this;

    vm.deleteRound = function ($index) {
        vm.rounds.splice($index, 1);
    };

    vm.addRound = function () {
        vm.rounds.push(createRound());
    };

    function createRound() {
        return {numberOfQuestions: 10, name: ""}
    }
}