
function ChallengeFormCtrl(Challenges) {
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
}

ChallengeFormCtrl.$inject = ['Challenges'];

angular
  .module('pathleteApp.ChallengeFormCtrl', [
          'pathleteApp.services'
  ])
  .controller('ChallengeFormCtrl', ChallengeFormCtrl);