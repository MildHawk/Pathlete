var express = require('express');
var router = express.Router();
var dbHelper = require('../utils/dbHelpers.js');
var passport = require('passport');
var FitbitApiClient = require('fitbit-node');
var fitbitControl = require('../utils/fitbit.js');

passport.serializeUser(function(user, done) {
  /**
   * stores the user db model on `req.user`
   */
  // console.log('serializeUser:', user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('deserializeUser:', obj);
  done(null, obj);
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/login', function (req, res, next){
  res.redirect('/auth/fitbit');
});

passport.use(fitbitControl.fitbitStrategy);
router.get('/auth/fitbit', 
  passport.authenticate('fitbit', { failureRedirect: '/login' }),
  function (req,res) {});

router.get('/auth/fitbit/callback',
  passport.authenticate('fitbit', { failureRedirect: '/login' }),
  function (req,res) {
    res.redirect('/user/' + req.user.id);
  });

router.get('/userdata', function(req, res) {
  // console.log('req.user', req.user);
  dbHelper.getUserStats(req.user.id).once('value', function(data) {
    res.send(data.val());
  });
});

router.post('/api/challenge', function(req, res, next) {
  var userId = req.user.id;
  var challenge = req.body;
  dbHelper.addChallenge(userId, challenge, function(err, challenge) {
    if(err) { 
      return res.status(500).json({ 
        message: 'Error saving challenge' 
      });
    } else {
      return res.status(201).json({
        message: 'Challenge updated/created'
      });
    }
  });
});

router.get('/api/challenge/:userId', function(req, res, next) {
  var userId = req.params.userId;
  dbHelper.getChallenge(userId, function(challenge) {
    if(challenge){
      return res.status(200).json(challenge);
    } else {
      return res.status(404).json({ message: 'No challenge found' });
    }
  });
});

router.post('/donations', function(req, res) {
  // (Assuming you're using express - expressjs.com)
  // Get the credit card details submitted by the form
  var token = req.body.stripeToken;
  var name = req.body.name;
  var amount = req.body.amount;
  var userId = req.body.userId;
  console.log('inside /donations on server');
  dbHelper.addDonation(token, name, amount, function(err, charge) {
    if(err) return res.status(500).end();
    dbHelper.increaseAmount(userId, charge.amount, function(err, isSuccessful) {
      if(err) return res.status(500).end();
      res.status(201).end('charge successful');
    });
  });
});

/**
 * GET /authenticated
 * ==================
 * Returns whether user session is authenticated.
 */
router.get('/authenticated', function(req, res) {
  return res.status(200).json(!!req.user);
});

/**
 * GET /authorized
 * ================
 * Client sends the user profile ID it is currently viewing. Server checks if
 * session user matches the profile; if so, client is authorized to special
 * privileges (e.g. edit profile, add challenge). This was done to get around
 * the lack of JWTs.
 */
router.get('/authorized/:profileId', function(req, res) {
  if(!req.user) return res.status(401).json(false);
  if (req.user.id === req.params.profileId) {
    return res.status(200).json(true);
  } else {
    return res.status(401).json(false);
  }
});

router.get('/api/user/:userId', function(req, res) {
  var userId = req.params.userId;
  dbHelper.getUser(userId, function(user) {
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: 'No user found' });
    }
  });
});

router.get('/api/getCurrentUser', function(req, res) {
  res.json(req.user);
});

// router.get('/donations');

/**
 * restrict
 * ========
 * Middleware to require user authentication via passport
 */
function restrict(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

module.exports = router;
