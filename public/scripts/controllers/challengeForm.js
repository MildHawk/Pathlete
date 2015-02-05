
function ChallengeFormCtrl($http, Challenges) {
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
    this.formInfo.selection = this.selection;

    // TODO: Validate some stuff

    // TODO: connect to server
    console.log('Submitting form:', this.formInfo);

  };
}

ChallengeFormCtrl.$inject = ['$http', 'Challenges'];

angular
  .module('pathleteApp.ChallengeFormCtrl', [
          'pathleteApp.services'
  ])
  .controller('ChallengeFormCtrl', ChallengeFormCtrl);