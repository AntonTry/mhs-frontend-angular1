angular.module('resultSetup')
    .component('auctionRound', {
        templateUrl: 'admin/round-type/auction/auction-round-type.html',
        css: 'admin/round-type/auction/auction-round-type.css',
        controller: AuctionRoundTypeController
        ,
        bindings: {
            results: '=',
            onSave: '&'
        }
    });

AuctionRoundTypeController.$inject = [
    '$scope'
];

function AuctionRoundTypeController($scope) {
    let vm = this;

    $scope.$watch(() => {
        return vm.results;
    }, (res) => {
        if (res !== undefined && res[0].rate === undefined)
            initResults(res);
    });

    vm.saveResult = function (result) {
        result.score = result.rate * result.status;
        vm.onSave({result: result})
    };

    function initResults(res) {
        for (let result of res) {
            if (result.score !== undefined) {
                result.rate = Math.abs(result.score);

                setResultStatus(result);
            }
            else {
                result.rate = 0;
                result.status = -1
            }
        }
    }

    function setResultStatus(result) {
        if (result.score <= 0) {
            result.status = -1
        } else
            result.status = 1
    }
}
