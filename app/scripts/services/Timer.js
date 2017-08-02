(function() {
    function Timer($interval) {
      var Timer = {};

      /**
      * @desc Timer is on (currentSession = true) or off (false/null).
      * @type {Boolean}
      */
      Timer.currentSession = false;

      /**
      * @desc Current time remaining.
      * @type {Number}
      */
      Timer.remainingTime = null;

      /**
      * @desc Work Session length (in seconds).
      * @type {Number}
      */
      var WORK_SESSION_LENGTH = 1500;
      var countdown = null;

      /**
      * @function startCount
      * @desc Starts the countdown
      */
      var startCount = function(){
        Timer.currentSession = true;
        Timer.remainingTime = WORK_SESSION_LENGTH;

        countdown = $interval(function(){
          if(Timer.remainingTime > 0){
            Timer.remainingTime--;
          }
          else{
            Timer.currentSession = false;
          }
        }, 1000)
      };

      /**
      * @function resetCount
      * @desc Resets the countdown
      */
      var resetCount = function(){
        if(countdown){
          $interval.cancel(countdown);
          Timer.currentSession = false;
          Timer.remainingTime = WORK_SESSION_LENGTH;
        }
      };

      /**
      * @function startTimer
      * @desc Starts or resets the timer
      */
      Timer.startTimer = function(){
        if(Timer.currentSession){
          resetCount();
        }
        else{
          Timer.remainingTime = WORK_SESSION_LENGTH;
          startCount();
        }
      };


      return Timer;
    }

    angular
        .module('pomodoro')
        .factory('Timer', ['$interval', Timer]);
})();
