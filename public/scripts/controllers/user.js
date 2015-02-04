function UserController(user) {
  this.user = user;
  console.log('dung')
}
UserController.$inject = ['user'];

angular
  .module('pathleteApp.controllers.user', [])
  .controller('UserController', UserController);