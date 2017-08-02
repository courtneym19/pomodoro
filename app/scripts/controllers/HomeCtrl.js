(function() {
    function HomeCtrl(Timer) {

      this.timer = Timer;
  
    }


    angular
        .module('pomodoro')
        .controller('HomeCtrl', ['Timer', HomeCtrl]);
})();
