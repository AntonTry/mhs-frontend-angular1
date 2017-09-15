'use strict';
angular
  .module('mhs.admin', ['ngRoute',
    'firebase',
    'addTeams',
    'gameType',
    'gameResultsPage',
    'roundStatus',
    'teamResults',
    'login',
    'login-panel',
    'game-list',
    'createGame',
    'configGame',
    'roundBuilder',
    'ui.bootstrap',
    'teamList',
    'navbar',
    'gameTemplate',
    'season',
    'ngMeta',
  'updateMeta'])
  .config(['$routeProvider', 'ngMetaProvider', function ($routeProvider, ngMetaProvider) {

    let isAuth = {
      currentUser: ['userAuthService', function (auth) {
        return auth.currentUser();
      }]
    };
    $routeProvider.when('/games/:gameId/rounds/:roundNumber/:quizNumber', {
      template: '<result-setup></result-setup>',
      resolve: isAuth
    });
    $routeProvider.when('/games/:gameId/rounds', {
      template: '<round-status></round-status>',
      resolve: isAuth
    });
    $routeProvider.when('/login', {
      template: '<login></login>',
    });
    $routeProvider.when('/games', {
      template: '<game-list></game-list>',
      reloadOnSearch: false,
      data: {
        meta: {
          'type': 'website',
          'title': 'SHIT',
          'description':'SHIT',
          'url': 'https://testproj-cd085.firebaseapp.com/#!/games',
          'image': 'http://i2.wp.com/visitingnortheastengland.co.uk/wp-content/uploads/2015/03/the-magic-hat-vector_MkmX1gPu.jpg',
        }
      }
    });
    $routeProvider.when('/teams', {
      template: '<team-list></team-list>',
    });

    $routeProvider.when('/games/:gameId/print', {
      template: '<print-teams></print-teams>',
      controller: 'presentationModeController'
    });
    $routeProvider.when('/create-game', {
      template: '<create-game></create-game>',
    });
    $routeProvider.when('/games/:gameId/config', {
      template: '<config-game></config-game>',
      resolve: isAuth,
      reloadOnSearch: false
    });
    $routeProvider.when('/games/:gameId/results', {
      template: '<game-results-page></game-results-page>'
    });
    $routeProvider.when('/games/:gameId/results-presentation', {
      template: '<game-results></game-results>',
      controller: 'presentationModeController'
    });
    $routeProvider.when('/games/:gameId/results/:teamId', {
      template: '<team-results></team-results>',
    });
    $routeProvider.when('/templates', {
      template: '<current-game-template></current-game-template>',
    });
    $routeProvider.when('/templates/:templateId', {
      template: '<current-game-template></current-game-template>',
    });
    $routeProvider.when('/seasons', {
      template: '<season-list></season-list>'
    });
    $routeProvider.when('/seasons/:seasonId', {
      template: '<season></season>'
    });
  }])
  .run(["$rootScope", "$location", 'userAuthService', 'ngMeta', function ($rootScope, $location, userAuthService, ngMeta) {
    $rootScope.$on("$routeChangeError", function () {
      $location.path("/login");
    });
    userAuthService.currentUser().then((res) => {
      $rootScope.currentUser = res.email;
    });
    ngMeta.init();
  }]);
