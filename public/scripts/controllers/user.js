function UserController($http, $modal, user, Donation, Challenges) {

  this.user = user;
  this.isEditing = false;
  
  function getGoalPercent(goal, raised) {
    /**
     * converts amount raised into percent string
     * and adds to user challenge object.
     */
    goal = parseInt(goal, 10);
    raised = parseInt(raised, 10);
    
    var completed = (raised/goal) * 100;

    return completed + '%';
  }

  // calculate percent completed of goal
  if (this.user.challenge) {
    this.user.challenge.completed = getGoalPercent(this.user.challenge.goal, this.user.challenge.raised);
  }

  this.donate = function() {
    // trigger donate modal
    var modal2 = $modal.open({
      templateUrl: '/views/user/donation-form.html',
      controller: 'DonationCtrl',
      size: 'md'
    });
  };

  this.editProfile = function() {
    this.isEditing = true;
  };

  this.saveProfile = function() {
    this.isEditing = false;
  };

  this.isAuthorized = false;

  this.checkAuth = function() {
    var _this = this;
    $http.get('/authorized/' + user.id)
      .success(function(result) {
        _this.isAuthorized = result;
      });
  };

  this.checkAuth();

}
UserController.$inject = ['$http','$modal', 'user','Donation', 'Challenges'];

angular
  .module('pathleteApp.controllers.user', [])
  .controller('UserController', UserController);