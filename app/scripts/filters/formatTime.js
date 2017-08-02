(function() {
    function formatTime() {
        return function(remainingTime) {
          var remainingMins = Math.floor(remainingTime / 60);
          var remainingSecs = remainingTime - remainingMins * 60;
          if (remainingSecs < 10) {
            return remainingMins + ":0" + remainingSecs;
          }
          else {
            return remainingMins + ":" + remainingSecs;
          }
        };
    }

    angular
        .module('pomodoro')
        .filter('formatTime', formatTime);
})();
