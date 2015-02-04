angular.module('pathleteApp.services', [])

.factory('Info', function ($http) {

  // gets user's fitbit info in the form of an object  
  var getInfo = function() {
    return $http({
      method: 'GET',
      url: '/userdata'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    getInfo: getInfo
  };

})

.factory('Tool', function($rootScope) {
  //sets default
  var toolbarShow = true;

  //when called, this lets all children functions know that it has been called. 
  var broadcast = function(state) {
    $rootScope.$broadcast('state.update', state);
  };

  //turns on toolbar and broadcasts that it has been toggles
  var toolbarOn = function() {
    toolbarShow = true;
    broadcast({state: true});
  };

  //turns off toolbar and broadcasts that it has been toggles
  var toolbarOff = function() {
    toolbarShow = false;
    broadcast({state: false});
  };

  return {
    toolbarShow: toolbarShow,
    toolbarOn: toolbarOn,
    toolbarOff: toolbarOff
  };
});
