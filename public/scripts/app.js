'use strict';

function config($stateProvider, $locationProvider, $urlRouterProvider) {

  $stateProvider
    .state('main', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      controllerAs: 'MainCtrl',
      url: '/'
    })
    .state('progress', {
      templateUrl: 'views/progress.html',
      controller: 'ProgressCtrl',
      url: '/progress'
    })
    .state('everest', {
       templateUrl: 'views/everest.html',
       controller: 'EverestCtrl',
       url: '/progress/everest'
    })
    .state('lutetia', {
      templateUrl: 'views/lutetia.html',
      controller: 'LutetiaCtrl',
      url: '/progress/lutetia'
    })
    .state('usa', {
      templateUrl: 'views/usa.html',
      controller: 'UsaCtrl',
      url: '/progress/usa'
    })
    .state('achievements', {
      templateUrl: 'views/achievements.html',
      controller: 'AchievementsCtrl',
      url: '/achievements'
    });

  //$urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode({enabled: true, requireBase: false});
}

config.$inject = ['$stateProvider', '$locationProvider','$urlRouterProvider'];

var app = angular
  .module('pathleteApp', [
    'pathleteApp.services',
    'pathleteApp.AchievementsCtrl',
    'pathleteApp.EverestCtrl',
    'pathleteApp.LutetiaCtrl',
    'pathleteApp.UsaCtrl',
    'pathleteApp.MainCtrl',
    'pathleteApp.ProgressCtrl',
    'pathleteApp.ToolbarCtrl',
    'ui.router'
  ])
  .config(config);