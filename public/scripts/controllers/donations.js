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
	
	//on ng-init, configure Stripe
	$scope.configureStripe = function() {
      Donation.configureStripe();
      //bind tokenId to scope to insert it the hidden field
      $scope.tokenId = Donation.tokenId;
	};

  $scope.donationPopup = function() {

  };
  //on ng-click, run sendDonation
  $scope.sendDonation = function() {
    Donation.makeDonation(name, description, amount);
  };

});

Donations.$inject = ['$scope', '$http', 'Donation'];

angular
  .module('pathleteApp.Donation', [
    'pathleteApp.services'
  ])
  .controller('Donation', Donation);