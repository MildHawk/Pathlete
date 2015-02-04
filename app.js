var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./server/config/environment');
var passport = require('passport');
var routes = require('./server/routes');
var session = require('express-session');


var app = express();
var server = http.createServer(app);

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// set default server view directory and view engine
app.set('views', __dirname + '/server/views');
app.set('view engine', 'ejs');  

app.use('/progress',express.static(__dirname + '/./public'));
app.use('/achievements',express.static(__dirname + '/./public'));
app.use(express.static(__dirname + '/./public'));

app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/auth/fitbit/callback', routes);

// catch all other routes and redirect to index
app.get('*', function(req, res, next) {
  res.render('index');
});

server.listen(config.port);
console.log('Express listening on:', config.port);
module.exports = app;
