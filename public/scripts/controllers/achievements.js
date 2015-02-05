'use strict';

function AchievementsCtrl($scope, $http, Info, Tool) {
  $scope.userInfo = undefined;

  Tool.toolbarOn();

  $scope.getUserInfo = function() {
    Info.getInfo()
      .then(function(user) {
        $scope.userInfo = user;
        $scope.totalSteps = user.stats.lifetime.total.steps;
        $scope.totalFlights = user.stats.lifetime.total.floors;
        if(!$scope.totalFlights) {
          $scope.totalFlights = 0;
        }

        $scope.getPercent = function(goal, progress) {  //used to set width of progress in bar
          if((progress/goal) < 1) {
            return progress/goal * 100;
          } else {
            return 100;
          }
        };

        $scope.achievements = [
          {
            name: 'First Steps',
            description:'Walk across the Golden Gate Bridge!',
            goal: 3400,
            unit:'steps',
            width: $scope.getPercent(3400, $scope.totalSteps),
            // width: ($scope.totalFlights/2900)*100 < 100 ? ($scope.totalFlights/2900)*100 : 100,
            current: $scope.totalSteps, 
            image: 'background-image: url(../images/GoldenGateBridge.jpg); background-size: contain; border: 1px solid black;'
          }, {
            name: 'Bay to Breakers',
            description:'Get from AT&T Park to Lands End!',
            goal: 15000,
            unit:'steps',
            width: $scope.getPercent(15000, $scope.totalSteps),
            current: $scope.totalSteps,
            image: 'background-image: url(../images/bayToBreakers.jpg); background-size: contain; border: 1px solid black;'
          }, {
            name: 'Shire to Mordor',
            description:'Can one simply walk to Mordor?',
            goal: 3600000,
            unit: 'steps',
            width: $scope.getPercent(3600000, $scope.totalSteps),
            current: $scope.totalSteps,
            image: 'background-image: url(../images/Mordor.jpg); background-size: contain; border: 1px solid black;'
          }, {
            name: 'Hike the Burj Khalifa',
            description:'Climb the worlds tallest building!',
            goal: 290,  
            unit: 'flights',
            width: $scope.getPercent(290, $scope.totalFlights),
            current: $scope.totalFlights,
            image: 'background-image: url(../images/Burj.jpg); background-size: contain; border: 1px solid black;'
          }, {
            name: 'Everest Challenge',
            description:'Climb 2900 flights of stairs!',
            goal: 1200,
            unit: 'flights',
            width: $scope.getPercent(1200, $scope.totalFlights),
            current: $scope.totalFlights,
            image: 'background-image: url(../images/Everest_background.jpg); background-size: contain; border: 1px solid black;'   
          }, {
            name: 'Walk Across America',
            description:'Trek from SF to NY!',
            goal: 5146000,
            unit: 'steps',
            width: $scope.getPercent(5146000, $scope.totalSteps),
            current: $scope.totalSteps,
            image: 'background-image: url(../images/america.jpg); background-size: contain; border: 1px solid black;'
          }
        ];
        
        //get total stairs    
      });
  };

  $scope.getUserInfo();
}

AchievementsCtrl.$inject = ['$scope', '$http', 'Info', 'Tool'];

angular
  .module('pathleteApp.AchievementsCtrl', [
    'pathleteApp.services'
  ])
  .controller('AchievementsCtrl', AchievementsCtrl);