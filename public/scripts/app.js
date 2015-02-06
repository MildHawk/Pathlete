'use strict';

function config($stateProvider, $locationProvider, $urlRouterProvider) {

  $stateProvider
    .state('user', {
      templateUrl: '/views/user/user.html',
      controller: 'UserController',
      controllerAs: 'UserCtrl',
      url: '/user/:userId',
      resolve: {
        // inject the user into state via resolve
        user: ['$http', '$stateParams', function($http, $stateParams) {
          
          // TODO: Make api end point to return users
          // return $http.get('/api/user/' + $stateParams.userId).then(function(response) {
          //   // return user data
          //   return response.data;
          // }).catch(function(err) {
          //   // user doesn't exist?
          // });
    
          return {
            _id: '1241421414124',
            id: '123',
            username: 'RickWuebker',
            age: 36,
            location: {
              city: 'San Francisco',
              state: 'CA'
            },
            totalSteps: 666,
            quote: '"I enjoy walking around my neighborhood at night!"',
            challenge: {
              challengeName: 'Climb Mount Everest',
              why: 'Since I was a wee boy I\'ve always dreamed about walking a distance equivilent to walking up Mount Everest.  With your contribution of $500 my dream could become reality.',
              createAt: '11-22-2015',
              goalDate: '11-22-2016',
              charityName: 'Bobs Donut Shop',
              goal: '$500',
              info: 'The Climb Mount Everest challenge involves walking up 18,000 flights of stairs. People frequently die on this challenge.',
              raised: '$123'
            }
          };
        }]
      }
    })
    .state('main', {
      templateUrl: '/views/main.html',
      controller: 'MainCtrl',
      controllerAs: 'MainCtrl',
      url: '/'
    })
    .state('progress', {
      templateUrl: '/views/progress.html',
      controller: 'ProgressCtrl',
      url: '/progress',
      authenticate: true
    })
    .state('everest', {
      templateUrl: '/views/everest.html',
      controller: 'EverestCtrl',
      url: '/progress/everest'
    })
    .state('lutetia', {
      templateUrl: '/views/lutetia.html',
      controller: 'LutetiaCtrl',
      url: '/progress/lutetia'
    })
    .state('usa', {
      templateUrl: '/views/usa.html',
      controller: 'UsaCtrl',
      url: '/progress/usa'
    })
    .state('achievements', {
      templateUrl: '/views/achievements.html',
      controller: 'AchievementsCtrl',
      url: '/achievements',
      authenticate: true
    })
    // TODO: nest this into user view
    .state('createChallenge', {
      templateUrl: 'views/user/create-challenge-form.html',
      controller: 'ChallengeFormCtrl',
      controllerAs: 'ChallengeFormCtrl',
      url: '/create-challenge',
      authenticate: true
    })
    .state('donation', {
      templateUrl: '/views/user/donation-form.html',
      controller: 'DonationCtrl'
    });

  //$urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode({enabled: true, requireBase: false});

  //Public key used to generate a token that will be sent to the server
  window.Stripe.setPublishableKey('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
}

config.$inject = ['$stateProvider', '$locationProvider','$urlRouterProvider'];

function run($rootScope, $state, Auth) {
  $rootScope.$on('$stateChangeStart', 
                 function(e, toState, toParams, fromState, fromParams) {
    if(toState.authenticate) {
      Auth.isAuth()
        .success(function(authenticated) {
          if (!authenticated) {
            e.preventDefault();
            window.location = '/login';
          }
        }).error(function() {
          console.error('Error handling authentication');
        });
    }
  });
}

run.$inject = ['$rootScope', '$state', 'Auth'];

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
    'pathleteApp.DonationCtrl',
    'pathleteApp.controllers.user',
    'pathleteApp.ChallengeFormCtrl',
    'ui.router',
    'ui.bootstrap',
    'angularPayments'
  ])
  .config(config)
  .run(run);