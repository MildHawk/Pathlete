function UserController(user) {
  this.user = user;
}
UserController.$inject = ['user'];

angular
  .module('pathleteApp.controllers.user', [])
  .controller('UserController', UserController);