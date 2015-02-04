'use strict';

function ProgressCtrl($scope, $http, Info, Tool) {
  //user info
  $scope.userInfo = undefined;

  Tool.toolbarOn();

  $scope.distance = 0;

  $scope.getUserInfo = function() {
    Info.getInfo()
      .then(function(user) {
        $scope.userInfo = user;
        console.log(user);
        var farness = (user.stats.lifetime.total.distance / 150) * 700;
        if (farness > 700) {
          $scope.distance = 700;
        } else {
          $scope.distance = farness;
        }
      });
  };
  
  $scope.getUserInfo();
}

ProgressCtrl.$inject = ['$scope', '$http', 'Info', 'Tool'];

angular
  .module('pathleteApp.ProgressCtrl', [
    'pathleteApp.services'
  ])
  .controller('ProgressCtrl', ProgressCtrl);