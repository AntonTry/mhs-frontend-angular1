angular.module('roundBuilder')
    .component('roundBuilder', {
        templateUrl: 'admin/round-builder/round-builder.html',
        css: 'admin/round-builder/round-builder.css',
        controller: roundBuilder,
        bindings: {
            rounds: '='
        },
    });

roundBuilder.$inject = ['roundTypeService'];

function roundBuilder(roundTypeService) {
    let vm = this;
    vm.$onInit = onInit;

    function onInit() {
        getRoundTypes()
            .then(setDefaultType)
            .then(setSelectedType);
    }

    vm.dragAndDropRound = function($index){
        vm.rounds.splice($index, 1);
    };

    vm.deleteRound = function ($index) {
        vm.rounds.splice($index, 1);
    };

    vm.addRound = function ($event) {
        vm.rounds.push(createRound());
        $event.preventDefault();
    };

    function createRound() {
        return {numberOfQuestions: 10, name: "", roundType: vm.defaultType}
    }

    function getRoundTypes() {
        return roundTypeService.getRoundTypes()
            .then((types) => {
                vm.roundTypes = types;
                vm.roundTypes.forEach((item) => {
                    item.type = item.$id;
                });
                return types;
            });
    }

    function setDefaultType(type) {
        type.forEach((item) => {
            if (item.$id === "DEFAULT_ROUND") {
                vm.defaultType = item;
            }
        });
        return type;
    }

    function setSelectedType() {
        vm.rounds.forEach((item) => {
            vm.roundTypes.forEach((typeItem) => {
                if (typeItem.$id === item.roundType.type) {
                    item.roundType = typeItem;
                }
            });
        })
    }
}