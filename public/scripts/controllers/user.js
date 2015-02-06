function UserController($http, $modal, user, Donation) {

  this.user = user;

  this.isEditing = false;
  
  console.log('data', this.user);
  
  function getGoalPercent(goal, raised) {
    /**
     * converts amount raised into percent string
     * and adds to user challenge object.
     */
    goal = parseInt(goal.substr(1), 10);
    raised = parseInt(raised.substr(1), 10);
    var completed = (raised/goal) + '';
    return completed.split('.')[1].substr(0, 2) + '%';
  }

  // calculate percent completed of goal
  // if (this.user.challenge.goal && this.user.challenge.raised) {
  //   this.user.challenge.completed = getGoalPercent(this.user.challenge.goal, this.user.challenge.raised);
  // }

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
        _this.isAuthorized = result.data;
      });
  };

  this.checkAuth();

}
UserController.$inject = ['$http','$modal', 'user','Donation'];

angular
  .module('pathleteApp.controllers.user', [])
  .controller('UserController', UserController);