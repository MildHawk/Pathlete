var FitbitStrategy = require('passport-fitbit').Strategy;
var FitbitApiClient = require('fitbit-node');
var passport = require('passport');
var db = require('./db');
var dbHelper = require('./dbHelpers.js');
var config = require('../server/config/environment');

module.exports = exports = {
  fitbitStrategy: new FitbitStrategy({
      consumerKey: config.fitbit.consumerKey,
      consumerSecret: config.fitbit.consumerSecret,
      callbackURL: '/auth/fitbit/callback',
      userAuthorizationURL: 'https://www.fitbit.com/oauth/authorize'
    }, function (token, tokenSecret, profile, done) {   
      //after oath login call this success handler
      // add or update user in db
      dbHelper.addUser(token, tokenSecret, profile, function(user) {
        // user contains user db model
        // update user fitbit stats in db
        // console.log('addUser finished', user);
        exports.getStats(user.id, token, tokenSecret).then(function() { 
          /**
           * TODO: there may be an issue about asynchronicity of getStats and
           * addUserStats. Hopefully will not cause problems.
           */
          // console.log('getStats finished');
          db.child('users').child(user.id).once('value', function(user) {
            done(null, user.val());
          });
          // //done tells the program you are done and want to go to the next step
          // var userObj = profile._json.user;

          // done(null, profile._json.user); 
        });
        
      });  
    }),

  getStats: function (userID, token, secret) {
    var client = new FitbitApiClient(config.fitbit.consumerKey, config.fitbit.consumerSecret);
    //creates the request to get activites json from fitbit
    return client.requestResource('/activities.json', 'GET', token, secret).then(function (data) {  
        //success handler for req, return the promise
        dbHelper.addUserStats(userID, data[0]); 
      }, function (err) {
        console.log('ERROR!',err);
      });
  }
};
