'use strict';

function LutetiaCtrl($scope, $http, Info, Tool) {
  //user info
  $scope.userInfo = undefined;

  //ensures toolbar is on
  Tool.toolbarOn();

  //distance in pixels
  $scope.distance = 0;

  $scope.getUserInfo = function(){
    Info.getInfo()
      .then(function(user){
        $scope.userInfo = user; 
        var farness = (user.stats.lifetime.total.distance/150)*700;
        if (farness>700) {
          $scope.distance = 700;
        } else {
          $scope.distance = farness;
        }
      });
  };
  
  $scope.getUserInfo();
}

LutetiaCtrl.$inject = ['$scope', '$http', 'Info', 'Tool'];

angular
  .module('pathleteApp.LutetiaCtrl', [
    'pathleteApp.services'
  ])
  .controller('LutetiaCtrl', LutetiaCtrl);