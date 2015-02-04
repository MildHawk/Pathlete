'use strict';

/**
 * 
 * 
 * 
 * 
 * 
 * 
 */


function Donation($scope, $http, Donation) {
  $scope.stripeCallback = function (code, result) { 
    if (result.error) { 
      window.alert('it failed! error: ' + result.error.message); 
    } else { 
      window.alert('success! token: ' + result.id); 
      Donation.sendToServer(result.id)
    } 
  };
});

Donations.$inject = ['$scope', '$http', 'Donation'];

angular
  .module('pathleteApp.Donation', [
    'pathleteApp.services'
  ])
  .controller('Donation', Donation);