'use strict';

/**
 * 
 * 
 * 
 * 
 * 
 * 
 */


function DonationCtrl($scope, $http, Donation) {
  $scope.stripeCallback = function (code, result) { 
    if (result.error) { 
      console.log('it failed! error: ' + result.error.message); 
    } else { 
      console.log('success! token: ' + result.id); 
      Donation.sendToServer(result.id);
    } 
  };
}

DonationCtrl.$inject = ['$scope', '$http', 'Donation'];

angular
  .module('pathleteApp.DonationCtrl', [
    'pathleteApp.services'
  ])
  .controller('DonationCtrl', DonationCtrl);