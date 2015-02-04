'use strict';
 
function EverestCtrl($scope, $http, Info, Tool) {
  $scope.userInfo = undefined;

  //ensures toolbar at top is on
  Tool.toolbarOn();

  //distance in pixels
  $scope.distance = 0;


  $scope.getUserInfo = function() {
    Info.getInfo()
      .then(function(user) {
        $scope.userInfo = user;
        var farness = 525-((user.stats.lifetime.total.floors*10)/12129)*395;
        if (farness > 700) {
          $scope.distance = 700;
        } else {
          $scope.distance = farness;
        }
        console.log($scope.userInfo);
      });
  };

  $scope.getUserInfo();
}

EverestCtrl.$inject = ['$scope', '$http', 'Info', 'Tool'];

angular
  .module('pathleteApp.EverestCtrl', [
    'pathleteApp.services'
  ])
  .controller('EverestCtrl', EverestCtrl);