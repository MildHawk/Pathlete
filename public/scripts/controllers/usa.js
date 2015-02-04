'use strict';

function UsaCtrl($scope, $http, Info, Tool) {
  //user info
  $scope.userInfo = undefined;

  Tool.toolbarOn();

  $scope.distance = 0;

  $scope.getUserInfo = function() {
    Info.getInfo()
      .then(function(user) {
        console.log('UsaCtrl user,', user);
        $scope.userInfo = user;
        var farness = 50 + (user.stats.lifetime.total.distance / 4828) * 650;
        if (farness > 650) {
          $scope.distance = 650;
        } else {
          $scope.distance = farness;
        }
      });
  };

  $scope.getUserInfo();
}

UsaCtrl.$inject = ['$scope', '$http', 'Info', 'Tool'];

angular
  .module('pathleteApp.UsaCtrl', [
    'pathleteApp.services'
  ])
  .controller('UsaCtrl', UsaCtrl);