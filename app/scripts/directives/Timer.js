(function() {
    function Timer($interval) {
      var Timer = {};

      /**
      * @desc Timer is on (currentSession = true) or off (false/null).
      * @type {Boolean}
      */
      this.currentSession = false;

      /**
      * @desc Current time remaining.
      * @type {Number}
      */
      this.currentTime = null;

      /**
      * @desc Work Session length (in seconds).
      * @type {Number}
      */
      var workSession = 1500;

      var countdown = null;

      /**
      * @function startCount
      * @desc Starts the countdown
      */
      this.startCount = function(){
        this.currentSession = true;
        countdown = $interval(function(){
          if(this.currentTime > 0){
            this.currentTime--;
          }
          else{
            this.currentSession = false;
          }
        }, 1000)
      };

      /**
      * @function resetCount
      * @desc Resets the countdown
      */
      this.resetCount = function(){
        if(countdown){
          $interval.cancel(countdown);
          this.currentSession = false;
          this.currentTime = workSession;
        }
      };

      /**
      * @function manageTimer
      * @desc Starts or resets the timer
      */
      this.manageTimer = function(){
        if(this.currentSession){
          resetCount();
        }
        else{
          this.currentTime = workSession;
          startCount();
        }
      };

      return Timer;
    }

    angular
        .module('pomodoro')
        .directive('Timer', ['$interval', Timer]);
})();
