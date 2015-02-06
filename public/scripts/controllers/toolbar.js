'use strict';

function ToolbarCtrl($scope, $http, $location, Tool) {
  //sets showing to true or false
  $scope.showing = Tool.toolbarShow;

  //listens for when toolbar has been toggled, updates toolbar to show or hide based on results. Thing is a placeholder, update is whatever was passed into broadcast.
  $scope.$on('state.update', function(thing, update){
    $scope.showing = update.state;
  });

  $scope.getUserPage = function() {
    $http.get('/api/getCurrentUser').then(function(res) {
      if (res.data) {
        $location.url('/user/' + res.data.id);
      }
    });
  }
}
ToolbarCtrl.$inject = ['$scope', '$http', '$location', 'Tool'];

angular
  .module('pathleteApp.ToolbarCtrl', [
    'pathleteApp.services'
  ])
  .controller('ToolbarCtrl', ToolbarCtrl);
