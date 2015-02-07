function ModalInstanceCtrl($scope, $modalInstance) {
  

  // $scope.closeModal = function () {
  //   $modalInstance.close();
  // };

  // $scope.cancel = function () {
  //   $modalInstance.dismiss('cancel');
  // };

}
ModalInstanceCtrl.$inject = ['$scope','$modalInstance'];

angular
  .module('pathleteApp.controllers.modalInstance', [])
  .controller('ModalInstanceCtrl', ModalInstanceCtrl);