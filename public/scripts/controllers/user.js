function UserController(user) {
  this.user = user;
  // calculate percent completed of goal
  if (this.user.challenge.goal && this.user.challenge.raised) {
    /**
     * converts amount raised into percent string
     * and adds to user challenge object.
     */
    var goal = parseInt(this.user.challenge.goal.substr(1), 10);
    var raised = parseInt(this.user.challenge.raised.substr(1), 10);
    var completed = (raised/goal) + '';
    this.user.challenge.completed = completed.split('.')[1].substr(0, 2) + '%';
  }

}
UserController.$inject = ['user'];

angular
  .module('pathleteApp.controllers.user', [])
  .controller('UserController', UserController);