function Info($http) {
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

}

Info.$inject = ['$http'];

function Tool($rootScope) {
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
}

<<<<<<< HEAD
Tool.$inject = ['$rootScope'];

function Donation($http) {
=======
.factory('Donation', function($http) {

>>>>>>> insert tokekId on view and configure strip on init
  var tokenId;

  var configureStripe = function() {
    var handler = StripeCheckout.configure({
      //this is the publishable key, which is meant just to generate the token that we will pass to the server
      key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
      image: '/square-image.png',
      token: function(token) {
        tokenId = token.id;
      }
    });
  };
<<<<<<< HEAD
 
=======
  
>>>>>>> insert tokekId on view and configure strip on init
  var makeDonation = function(token, amount) {
    return $http({
      method: 'POST',
      url: '/donations',
      data: { test: 'test' },
    })
    .then(function (resp) {
      return resp.data;
    })
    .catch(function() {

    })
  };

  return {
    makeDonation: makeDonation,
    configureStripe: configureStripe,
    tokenId, tokenId
<<<<<<< HEAD
  };
};

Donation.$inject = ['$http'];

angular
  .module('pathleteApp.services', [])
  .factory('Info', Info)
  .factory('Tool', Tool)
  .factory('Donation', Donation);
=======
>>>>>>> insert tokekId on view and configure strip on init
  }
})
