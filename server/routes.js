var express = require('express');
var router = express.Router();
var dbHelper = require('../utils/dbHelpers.js');
var passport = require('passport');
var FitbitApiClient = require('fitbit-node');
var fitbitControl = require('../utils/fitbit.js');


passport.serializeUser(function(user, done) {
  console.log('serializeUser:', user);
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
router.get('/auth/fitbit', passport.authenticate('fitbit', { failureRedirect: '/login' }), function (req,res) {
});


router.get('/auth/fitbit/callback', passport.authenticate('fitbit', { failureRedirect: '/login' }), function (req,res) {
  console.log(res.session);
  res.redirect('/progress');
});

router.get('/userdata', function(req, res) {
  console.log('req.user', req.user);
  dbHelper.getUserStats(req.user.encodedId).once('value', function(data) {
      res.send(data.val());
    });
});

module.exports = router;
