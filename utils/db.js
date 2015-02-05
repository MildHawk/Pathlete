var Firebase = require('firebase');
var config = require('../server/config/environment');

var db = new Firebase(config.firebase.uri);

module.exports = db;