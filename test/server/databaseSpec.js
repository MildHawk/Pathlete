/*jshint -W079 */

var expect = require('chai').expect;
var db = require('../../utils/db.js');
var helpers = require('../../utils/dbHelpers.js');


var onComplete = function(error) {
  if (error) {
    console.log('Synchronization failed');
  } else {
    console.log('Synchronization succeeded');
  }
};


describe('tests the dbHelper functions', function (){

  var user = {};
  user._json = {};
  user._json.user = {};
  user._json.user.fullName = 'Billy Bob Thorton';
  user._json.user.strideLengthRunning = 2;
  user._json.user.strideLengthWalking = 1;
  user._json.user.distanceUnit = 'en_US';
  user.id = '123456';
  var testToken = 'abcdefg';
  var testSecret = 'MEOWMEOWMEOW';
  var done = function () {return 'i ran and am done';};

  it ('addUser stores a user in the database', function (done) {
    helpers.addUser(testToken, testSecret, user);
    db.child('users').child('123456').once('value', function (data){
      var test = data.val();
      expect(test.id).to.equal('123456');
      expect(user._json.user.fullName).to.equal(test.name);
      done();
    });
  });

  it ('gets the user status from the database', function (done){
    helpers.getUserStats(user.id).once('value', function (data) {
      expect(data.val().id).to.equal('123456');
      expect(data.val().tokenSecret).to.equal('MEOWMEOWMEOW');
      done();
    });
  });

  it ('adds some stats to the database', function (done) {
    var stats = {};
    stats.lifetime = {};
    stats.lifetime.steps = 1000;
    stats.lifetime.floors = 100;
    stats = JSON.stringify(stats);
    helpers.addUserStats(user.id, stats);
    db.child('users').child(user.id).once('value', function (data) {
      data = data.val();
      expect(data.stats.lifetime.steps).to.equal(1000);
      expect(data.stats.lifetime.floors).to.equal(100);
      done();
    });
  });

  db.child('users').child(user.id).remove(onComplete);
});


