angular.module('gameResultsPage')
    .component('gameResultsPage', {
        templateUrl: 'admin/game-results/game-results-page.html',
        controller: ['ResultServiceFactory', 'GameServiceFactory', '$routeParams', '$rootScope', '$location', '$window','userAuthService', function (ResultService, GameService, $routeParams, $rootScope, $location, $window,auth) {


            this.$onInit = onInit;

            this.teamResults = function () {
                $window.open($window.location.origin + `/#!/games/${$routeParams.gameId}/results-presentation`, ``, `width=${screen.availWidth},height=${screen.availHeight}`);
            };

            function onInit() {
                ResultService.getParsedResults($routeParams.gameId)
                    .then((result) => {
                        this.results = result;
                        console.log(this.results);
                    });
            }

            this.shareURL =  $location.absUrl();



            this.onBack = function () {
                auth.currentUser()
                    .then(()=>{
                    $location.path(`/games/${$routeParams.gameId}/rounds`);
                })
                .catch (()=>{
                    $location.path(`/games`);
                })
                ;
            }
        }]

    });