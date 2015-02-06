function Info($http) {
  // gets user's fitbit info in the form of an object  
  var getInfo = function() {
    return $http({
      method: 'GET',
      url: '/userdata'
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

Tool.$inject = ['$rootScope'];

function Donation($http, $stateParams, $modal) {

  var donor = {};

  var setDonor = function(name, amount) {
    donor.name = name;
    donor.amount = amount;
    console.log(donor);
  };

  var getDonor = function() {
    return donor;
  };

  var sendTokenToServer = function(token) {
    console.log('donor-->', donor);
    return $http({
      method: 'POST',
      url: '/donations',
      data: { stripeToken: token, name: donor.name, amount: donor.amount, userId: $stateParams.userId }
    })
    .then(function (resp) {    
      return resp;
    })
    .catch(function(err) {
      return err;
    });
  };

  return {
    sendTokenToServer: sendTokenToServer,
    setDonor: setDonor,
    getDonor: getDonor
  };
}

Donation.$inject = ['$http', '$stateParams', '$modal'];

function Challenges() {
  var challenges = [
    {
      name: 'First Steps',
      description:'Walk across the Golden Gate Bridge!',
      goal: 3400,
      unit:'steps',
      image: 'background-image: url(../images/GoldenGateBridge.jpg); background-size: contain;'
    }, {
      name: 'Bay to Breakers',
      description:'Get from AT&T Park to Lands End!',
      goal: 15000,
      unit:'steps',
      image: 'background-image: url(../images/bayToBreakers.jpg); background-size: contain;'
    }, {
      name: 'Shire to Mordor',
      description:'Can one simply walk to Mordor?',
      goal: 3600000,
      unit: 'steps',
      image: 'background-image: url(../images/Mordor.jpg); background-size: contain;'
    }, {
      name: 'Hike the Burj Khalifa',
      description:'Climb the worlds tallest building!',
      goal: 290,  
      unit: 'flights',
      image: 'background-image: url(../images/Burj.jpg); background-size: contain;'
    }, {
      name: 'Everest Challenge',
      description:'Climb 2900 flights of stairs!',
      goal: 1200,
      unit: 'flights',
      image: 'background-image: url(../images/Everest_background.jpg); background-size: contain;'   
    }, {
      name: 'Walk Across America',
      description:'Trek from SF to NY!',
      goal: 5146000,
      unit: 'steps',
      image: 'background-image: url(../images/america.jpg); background-size: contain;'
    }
  ];

  return {
    challenges: challenges
  };
}

Challenges.$inject = [];

function Auth($http) {
  
  var isAuth = function() {
    return $http.get('/authenticated');
  };

  return {
    isAuth: isAuth
  };
  
}

Auth.$inject = ['$http'];

angular
  .module('pathleteApp.services', [])
  .factory('Info', Info)
  .factory('Tool', Tool)
  .factory('Donation', Donation)
  .factory('Challenges', Challenges)
  .factory('Auth', Auth);
