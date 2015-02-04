'use strict';

/**
 * 
 * 
 * 
 * 
 * 
 * 
 */


app.controller('Donations', function ($scope, $http, Donation) {
	
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
