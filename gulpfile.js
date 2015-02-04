var gulp = require('gulp');
var karma = require('karma').server;
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var preprocess = require('gulp-preprocess');
var istanbul = require('gulp-istanbul');
var coveralls = require('gulp-coveralls');
var plumber = require('gulp-plumber');

var paths = {
  src: {
    bower: './public/bower_components',
    js: './public/scripts',
    scss: './public/styles',
    img: './public/images',
    views: './public/views',
  },
  dist: {
    js: './public/dist/js',
    css: './public/dist/css',
    img: './public/dist/img',
    views: './public/dist/views'
  },
  server: './server',
  spec: './test',
  serverSpec: './test/server/**/*.js',
  karmaConf: __dirname + '/test/karma.conf.js'
};

// Log errors in gulp to the console
var handleError = function(err) {
  console.log(err.toString());
  this.emit('end');
};

// src files for server (used in code coverage)
var serverFiles = [
  './app.js',
  './server/routes.js',
  './utils/**/*.js'
];

// JS files for deployment (stuff to be concat'ed, minified, etc.)
var jsFiles = [
  paths.src.bower + '/angular/angular.js',
  paths.src.bower + '/angular-ui-router/release/angular-ui-router.js',
  paths.src.js + '/**/*.js'
];

// Keep track of own JS files for linting
var jsFilesForLint = [
  // TODO: set files for linting
  // paths.src.js + '/**/*.js',
  // paths.server + '/**/*.js',
  // paths.spec + '/**/*.js'
];

gulp.task('javascript', function() {
  gulp.src(jsFiles)
  .pipe(concat('app.min.js'))
  // .pipe(uglify({
  //   beautify: true
  // }))
  .on('error', handleError)
  .pipe(gulp.dest(paths.dist.js));
});

/**
 * Run JSHint
 */
gulp.task('lint', function() {
  return gulp.src(jsFilesForLint)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    // Error out if any warnings appear
    .pipe(jshint.reporter('fail'));
});

gulp.task('moveViews', function() {
  gulp.src(paths.src.views + '/**/*')
    .pipe(gulp.dest(paths.dist.views));
});

gulp.task('compass', function() {
  gulp.src(paths.src.scss + '/*.scss')
    .pipe(compass({
      css: paths.dist.css,
      sass: paths.src.scss,
      image: paths.dist.img,
      require: ['breakpoint']
    }))
    .on('error', handleError)
    .pipe(minifyCSS())
    .pipe(concat('app.css'))
    .pipe(gulp.dest(paths.dist.css));
});

// gulp.task('processEnv', function() {
//   gulp.src(jadeFiles)
//     .pipe(preprocess({context: envConfig}))
//     .pipe(gulp.dest(paths.jade + '/dist'));
// });

/******************************************************************************
 * Environment configuration
 *****************************************************************************/
/**
 * envConfig, envConfigDevelopment, and envConfigProduction are used to configure builds
 * with the proper environment. Arguments are passed into the preprocess
 * task to insert variables into files. For example, the base href needs
 * to be dynamically set based on the environment.
 */
var envConfig;

var envConfigDevelopment = {
};

var envConfigProduction = {
};

/******************************************************************************
 * Testing suite
 *****************************************************************************/

// Run testing suite: lint, karma (client-side) and mocha (server-side)
gulp.task('test', function(callback) {
  /**
   * Use `runSequence` to call tasks synchronously, otherwise
   * messages from both will be potentially interleaved.
   */
  // TODO add lint
  // runSequence('lint', 'karma', 'mocha', callback);
  runSequence('karma', 'mocha', callback);
});

gulp.task('karma', function (done) {
  return karma.start({
    configFile: paths.karmaConf,
    singleRun: true
  }, done);
});

/**
 * mocha
 * =====
 * Runs the mocha tests. Because gulp-mocha is stupid, this task must be
 * forcibly exited using `process.exit()`. As such, **no other tasks will
 * successfully be reached after this task.** Do whatever hair-brained
 * workarounds are necessary to not have any tasks be dependent on this one.
 */

var handleMochaError = function (err) {
  console.log('Mocha encountered an error, exiting with status 1');
  console.log('Error:', err.message);
  process.exit(1);
};

gulp.task('mocha', function (cb) {
  var mochaErr;
  // Track src files that should be covered
  gulp.src(serverFiles)
    .pipe(istanbul({ includeUntested: true })) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function() {
      // Specify server specs
      gulp.src(paths.serverSpec, {read: false})
        .pipe(plumber())
        .pipe(mocha({
          reporter: 'spec',
          timeout: 20000
        }))
        /**
         * Keep track of latest error on Mocha. Because a failed test counts
         * as an error, the process should not be exited until end of tests.
         */
        .on('error', function(err) {
          /**
           * This intermediate log is useful for when mocha crashes (as opposed
           * to a test failing). Can be commented out if needed.
           */
          console.error('ERROR:', err.message);
          console.error('Stack:', err.stack);
          mochaErr = err;
        })
        // Write reports to Istanbul
        .pipe(istanbul.writeReports())
        /**
         * The methods below are a hack to get gulp to exit after mocha tests
         * finish. Without them, `gulp mocha` doesn't exit and Travis
         * never finishes running the tests.
         */
        .on('end', function () {
          if (mochaErr) return handleMochaError(mochaErr);
          // Force mocha to exit, because gulp-mocha is stupid.
          process.exit();
        });
    });
});

/**
 * coveralls
 * =========
 * Sends code coverage data to Coveralls.
 */
gulp.task('coveralls', function () {
  if (!process.env.CI) return;
  return gulp.src('./coverage/lcov.info')
    .pipe(coveralls());
});

gulp.task('watch', function() {
  gulp.watch(paths.src.img + '/**/*', ['image']);
  gulp.watch(paths.src.scss + '/**/*.scss', ['compass']);
  gulp.watch(paths.src.js + '/**/*.js', ['lint', 'javascript']);
  gulp.watch(paths.src.views + '/**/*', ['moveViews']);
});

/**
 * build is the entry-point to build out app artifacts for deployment. Runs
 * sub-task based on environment.
 */
gulp.task('build', function() {
  var env = process.env.NODE_ENV || 'development';
  gulp.start('build-' + env);
});

/**
 * build-development and build-production tasks are to build out the app with different
 * configurations. Preprocessing is necessary to insert the appropriate
 * base href into the Jade partials.
 */
gulp.task('build-development', function() {
  // envConfig = envConfigDevelopment;
  // gulp.start('compass', 'image', 'moveViews', 'lint', 'javascript');
  gulp.start('compass', 'moveViews', 'lint', 'javascript');
});

gulp.task('build-production', function() {
  // envConfig = envConfigProduction;
  // gulp.start('compass', 'image', 'moveViews', 'lint', 'javascript');
  gulp.start('compass', 'moveViews', 'lint', 'javascript');
});

gulp.task('default', ['build-development', 'watch']);
