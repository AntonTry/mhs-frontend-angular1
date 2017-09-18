(function () {
  angular
    .module('gameResultsPage')
    .component('gameResultsPage', {
      templateUrl: 'app/admin/game-results/game-results-page.html',
      css: 'app/admin/game-results/game-results-page.css',
      controller: GameResultsPageController
    });

  GameResultsPageController.$inject = ['ResultServiceFactory', 'GameServiceFactory', '$routeParams', '$location', '$window', 'userAuthService', 'ngMeta'];

  function GameResultsPageController(ResultService, GameService, $routeParams, $location, $window, userAuthService, ngMeta) {

    let vm = this;

    vm.$onInit = onInit;

    let gameId = $routeParams.gameId;

    function onInit() {
      vm.gameId = $routeParams.gameId;

      vm.isGameCurrent = true;
      vm.photosUrl = '';

      vm.teamResults = function () {
        $window.open($window.location.origin + `/#!/games/${gameId}/results-presentation`, ``, `width=${screen.availWidth},height=${screen.availHeight}`);
      };

      GameService.getGameStatus(this.gameId).then(status => {
        GameService.getDate(status, this.gameId).then(v => this.date = new Date(v.$value).toLocaleDateString());
      });

      ResultService.getParsedResults(this.gameId)
        .then((result) => {
          vm.results = result;
        });

      GameService.getGameStatus(gameId).then(status => {
        (status === "finished") ?
          vm.gameFinished = true : vm.gameFinished = false;
      });

      GameService.getPhotosUrl(gameId).then((res) => {
        vm.photosUrl = res;
        vm.newPhotosUrl = res;
      });

      userAuthService.currentUser()
        .then((res) => {
          vm.user = res;
        })
    }

    vm.shareURL = $location.absUrl();

    vm.savePhotosUrl = function () {
      GameService.setPhotosLink(gameId, vm.newPhotosUrl);
      vm.photosUrl = vm.newPhotosUrl;
      vm.linkEditor = false;
    };

    vm.editLink = function () {
      vm.newPhotosUrl = vm.photosUrl;
      vm.linkEditor = true;
    };

    vm.getTrimmedPhotosUrl = function () {
      let link = vm.photosUrl;
      let photosUrlArray = link.split('/');
      let photosUrlDomain = photosUrlArray[2];
      let photosUrlPath = photosUrlArray[3];
      let photosUrlLastCharacters = link.substring(link.length - 6);
      return photosUrlDomain + "/" + photosUrlPath + "/..." + photosUrlLastCharacters;
    };

    vm.onBack = function () {
      $window.history.back();
    };

    ngMeta.setTitle('GAME_RESULT_PAGE', 'GAME_RESULT_PAGE');
    ngMeta.setTag('url', 'https://gambler-cat-52452.netlify.com/#!/games/'+ gameId + '/results');
    ngMeta.setTag('description', 'GAME_RESULT_PAGE');
    ngMeta.setTag('image', 'http://i2.wp.com/visitingnortheastengland.co.uk/wp-content/uploads/2015/03/the-magic-hat-vector_MkmX1gPu.jpg');
  }
})();
