'use strict';

angular.module('mhs', [
  'ngRoute',
  'ngMessages',
  'mhs.admin',
  'mhs.player',
  'angularCSS',
  'teamFactory',
  'gameFactory',
  'resultSetup',
  'firebaseDataService',
  'userAuthService',
  'internalisation',
  'openGameService',
  'gameRequestService',
  'teamRequestService',
  'gameTemplateService',
  'gameBuildService',
  'convertService',
  '720kb.socialshare',
  'roundTypeService',
  'seasonService',
  'ngMeta'
])
  .config(['$locationProvider', '$routeProvider', '$animateProvider',
    function ($locationProvider, $routeProvider, $animateProvider) {
      $animateProvider.classNameFilter(/animated/);
      $routeProvider.otherwise({redirectTo: '/games'});
    }]);
