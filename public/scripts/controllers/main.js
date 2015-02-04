'use strict';

function MainCtrl($scope, $http, Tool) {
  //turns toolbar off
  Tool.toolbarOff();
}

MainCtrl.$inject = ['$scope', '$http', 'Tool'];

angular
  .module('pathleteApp.MainCtrl', [
    'pathleteApp.services'
  ])
  .controller('MainCtrl', MainCtrl);