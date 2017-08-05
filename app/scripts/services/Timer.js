(function() {
    function Timer($interval) {
      var Timer = {};

      /**
      * @desc Timer is on (isOn = true) or off (false/null).
      * @type {Boolean}
      */
      Timer.isOn = false;

      /**
      * @desc Work session is on (true) or off
      * @type {Boolean}
      */
      Timer.workSession = false;

      /**
      * @desc Break session is on (true) or off
      * @type {Boolean}
      */
      Timer.breakSession = false;

      /**
      * @desc Current time remaining.
      * @type {Number}
      */
      Timer.remainingTime = null;


      const WORK_SESSION_LENGTH = 3;
      const SHORT_BREAK_LENGTH = 2;
      const LONG_BREAK_LENGTH = 5;

      var completedWorkSessions = 0;

      var countdown = null;

      /**
      * @function startCount
      * @desc Starts the countdown
      */
      var startWorkSession = function(){
        countdown = $interval(function(){
          if(Timer.remainingTime > 0){
            Timer.remainingTime--;
          }
          else if (completedWorkSessions !== 4){
            Timer.isOn = false;
            Timer.workSession = false;
            Timer.breakSession = true;
          }
          else if (completedWorkSessions = 4){
            Timer.isOn = false;
            Timer.workSession = false;
            Timer.breakSession = true;
          }

        }, 1000)
      }

      var startBreakSession = function(){
        countdown = $interval(function(){
          if(Timer.remainingTime > 0){
            Timer.remainingTime--;
          }
          else{
            Timer.isOn = false;
            Timer.breakSession = false;
            resetSession();
          }
        }, 1000)
      }



      /**
      * @function resetSession
      * @desc Resets the countdown
      */
      var resetSession = function(){
        if(countdown){
          $interval.cancel(countdown);
        }
      };


      /**
      * @function startTimer
      * @desc Starts or resets the timer
      */
      Timer.startTimer = function(){
        if(Timer.isOn){
          resetSession();
          Timer.isOn = false;
          Timer.workSession = false;
          Timer.breakSession = false;
          Timer.remainingTime = WORK_SESSION_LENGTH;
        }
        else{
          Timer.isOn = true;
          if (Timer.breakSession == false && Timer.workSession == false){
            Timer.remainingTime = WORK_SESSION_LENGTH;
            startWorkSession();
          }
          else if (Timer.workSession == false && Timer.breakSession == true && completedWorkSessions !== 4){
            Timer.remainingTime = SHORT_BREAK_LENGTH;
            completedWorkSessions++;
            console.log(completedWorkSessions);
            startBreakSession();
          }
          else if (Timer.workSession == false && Timer.breakSession == true && completedWorkSessions == 4){
            Timer.remainingTime = LONG_BREAK_LENGTH;
            completedWorkSessions = 0;
            console.log(completedWorkSessions);
            startBreakSession();
          }
        }
      };


      return Timer;
    }

    angular
        .module('pomodoro')
        .factory('Timer', ['$interval', Timer]);
})();
