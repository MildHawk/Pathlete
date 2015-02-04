var FitbitStrategy = require('passport-fitbit').Strategy;
var FitbitApiClient = require('fitbit-node');
var passport = require('passport');
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
          //add user to db
          dbHelper.addUser(token, tokenSecret, profile);  
          //this line waits for 26 to finish
          exports.getStats(profile.id, token, tokenSecret).then(function() { 
            //done tells the program you are done and want to go to the next step
            done(null, profile._json.user); 
          });
        }),

  getStats: function (userID, token, secret) {
    var client = new FitbitApiClient(process.env.CONSUMER_KEY, process.env.CONSUMER_SECRET);
    //creates the request to get activites json from fitbit
    return client.requestResource('/activities.json', 'GET', token, secret).then(function (data) {  
        //success handler for req, return the promise
        dbHelper.addUserStats(userID, data[0]); 
      }, function (err) {
        console.log('ERROR!',err);
      });
  }
};
