'use strict';

function DonationCtrl($scope, $http, Donation, $modalInstance, $modal, $timeout) {
  $scope.stripeCallback = function (code, result) { 
    if (result.error) { 
      console.log('it failed! error: ' + result.error.message); 
    } else { 
      console.log('success! token: ' + result.id); 
      Donation.sendTokenToServer(result.id).then(function(){
        $modalInstance.close();
        var modalThanks = $modal.open({
          templateUrl: '/views/user/thankyou.html',
          controller: 'DonationCtrl', 
          size: 'md'
        });
        $timeout(function () {
          modalThanks.close('closing');
        }, 2000);
      });

    } 
  };

  $scope.closeModal = function(){
    $modalInstance.close();    
  }

  $scope.getData = function(name, amount) {
    Donation.setDonor(name, amount);
  };
}

DonationCtrl.$inject = ['$scope', '$http', 'Donation','$modalInstance', '$modal','$timeout'];

angular
  .module('pathleteApp.DonationCtrl', [
    'pathleteApp.services'
  ])
  .controller('DonationCtrl', DonationCtrl);