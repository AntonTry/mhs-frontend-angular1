(function () {
    angular.module('teamGamesList')
        .component('teamGamesList', {
            templateUrl: 'player/team-games-list/team-games-list.html',
            css: 'player/team-games-list/team-games-list.css',
            controller: TeamGamesList
        });

    TeamGamesList.$inject = ['$location', '$routeParams', 'TeamServiceFactory'];

    function TeamGamesList($location, $routeParams, teamService) {
        let vm = this;
        vm.$onInit = onInit;

        function onInit() {
            vm.teamId = $routeParams.teamId;
            initTeamGames();
            initTeam();
        }

        function initTeamGames() {
            teamService.getTeamGames(vm.teamId)
                .then(games => {
                    vm.teamGames = games;
                })
        }

        function initTeam() {
            teamService.getById(vm.teamId)
                .then(team => {
                    vm.team = team;
                })
        }

        vm.onClicked = function onClicked(gameId) {
            $location.path(`/games/${gameId}/results/${vm.teamId}`);
        }
    }
})();