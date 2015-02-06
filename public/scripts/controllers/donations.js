'use strict';

function DonationCtrl($scope, $http, $modalInstance, $modal, $timeout, Donation) {
  $scope.stripeCallback = function (code, result) { 
    $scope.loading = true;
    if (result.error) { 
      console.log('it failed! error: ' + result.error.message); 
      $scope.loading = false;
    } else { 
      console.log('success! token: ' + result.id); 
      Donation.sendTokenToServer(result.id).then(function(val){
        console.log('this is value:',val);
        $modalInstance.close();
        $scope.loading = false;
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
  };

  $scope.getData = function(name, amount) {
    amount = amount * 100;
    Donation.setDonor(name, amount);
  };
}

DonationCtrl.$inject = ['$scope', '$http', '$modalInstance', '$modal', '$timeout','Donation'];

angular
  .module('pathleteApp.DonationCtrl', [
    'pathleteApp.services'
  ])
  .controller('DonationCtrl', DonationCtrl);