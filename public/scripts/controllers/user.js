function UserController(user) {
  this.user = user;
  
  // calculate percent completed of goal
  if (this.user.challenge.goal && this.user.challenge.raised) {
    this.user.challenge.completed = getGoalPercent(this.user.challenge.goal, this.user.challenge.raised);
  }

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

  this.donate = function() {
    // trigger donate modal
  };

}
UserController.$inject = ['user'];

angular
  .module('pathleteApp.controllers.user', [])
  .controller('UserController', UserController);