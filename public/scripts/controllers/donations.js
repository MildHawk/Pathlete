'use strict';

function DonationCtrl($scope, $http, Donation) {
  $scope.stripeCallback = function (code, result) { 
    if (result.error) { 
      console.log('it failed! error: ' + result.error.message); 
    } else { 
      console.log('success! token: ' + result.id); 
      Donation.sendTokenToServer(result.id);
    } 
  };

  $scope.getData = function(name, amount) {
    console.log('name', name);
    console.log('amount', amount);

    Donation.setDonor(name, amount);
  };
}

DonationCtrl.$inject = ['$scope', '$http', 'Donation'];

angular
  .module('pathleteApp.DonationCtrl', [
    'pathleteApp.services'
  ])
  .controller('DonationCtrl', DonationCtrl);