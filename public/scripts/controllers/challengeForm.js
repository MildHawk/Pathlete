
function ChallengeFormCtrl($http, Challenges) {
  var _this = this;

  // Challenges available to user
  this.challenges = Challenges.challenges;

  this.selection = undefined;

  // Handle selection of a challenge
  this.selectChallenge = function(index) {
    this.selection = index;
    console.log(this.selection);
  };

  this.isSelected = function(index) {
    return this.selection === index;
  };

  // Handle form submission
  this.handleSubmit = function() {
    // Add challenge selection to form
    _this.formInfo.challengeName = Challenges.challenges[_this.selection].name;
    _this.formInfo.challengeDescription =
      Challenges.challenges[_this.selection].description;

    _this.formInfo.raised = 0;

    // TODO: Validate some stuff

    // TODO: connect to server
    console.log('Submitting form:', _this.formInfo);

    $http.post('/api/challenge', _this.formInfo)
      .success(function() {
        console.log('Created challenge');
        $http.get('/api/getCurrentUser')
          .success(function(data) {
            console.log('getCurrentUser data', data);
            window.location = '/user/' + data.data.id;
          });
      });

  };
}

ChallengeFormCtrl.$inject = ['$http', 'Challenges'];

angular
  .module('pathleteApp.ChallengeFormCtrl', [
          'pathleteApp.services'
  ])
  .controller('ChallengeFormCtrl', ChallengeFormCtrl);