var db = require('./db.js');

module.exports = {
  addUser: function (token, tokenSecret, profile, done){
    console.log('dbHelpers: profile:', profile);
    var err = '';
    //Add the user's profile info to the db
    db.child('users').child(profile.id).once('value', function (data) {
      if (data.val() === null) {
        console.log('token', token);
        console.log('tokenSecret', tokenSecret);
        console.log('profle', profile);
        console.log('data', data);
        var user = {};
        user.id = profile.id;
        user.tokenSecret = tokenSecret;
        user.token = token;
        /**
         * use `fullName` if available. For new users, it may be undefined.
         * The database will complain about this, so default to passing the
         * `displayName`, or anonymous
         */
        user.name = profile._json.user.fullName || 
          profile._json.user.displayName || 'anonymous';
        user.strideRunning = profile._json.user.strideLengthRunning;
        user.strideWalking = profile._json.user.strideLengthWalking;
        user.units = profile._json.user.distanceUnit;
        console.log('profile.id', profile.id);
        console.log('user', user);
        //if user is not already in the db
        db.child('users').child(profile.id).set(user);
      } else {
        //if user is already in db, update their profile info
        db.child('users').child(profile.id).update({tokenSecret: tokenSecret, token: token});
      }
    });
  },
  
  getUserStats: function (userID, callback) {
    //take user id and query the firebase database
    return db.child('users').child(userID);
    
  },
  
  //add user activity, such as stairs and steps to their profile in the db
  addUserStats: function (userID, userStats) {
    db.child('users').child(userID).child('stats').update(JSON.parse(userStats));
  },

  addDonation: function (token, email) {
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here https://dashboard.stripe.com/account
    var stripe = require("stripe")(config.stripe.apiKey);

    var charge = stripe.charges.create({
      amount: 1000, // amount in cents, again
      currency: "usd",
      card: token,
      description: "payinguser@example.com"
    }, function(err, charge) {
      if (err && err.type === 'StripeCardError') {
        // The card has been declined
      }
    });
  },
  getDonation: function() {

  }

};