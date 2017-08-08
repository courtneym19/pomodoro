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


      const WORK_SESSION_LENGTH = 1500;
      const SHORT_BREAK_LENGTH = 300;
      const LONG_BREAK_LENGTH = 1800;

      Timer.completedWorkSessions = 0;

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
          else if (Timer.remainingTime <= 0 && !Timer.breakSession){
            resetTimer();
            Timer.workSession = false;
            Timer.breakSession = true;
            Timer.completedWorkSessions++;
            console.log(Timer.completedWorkSessions);
          }
        }, 1000)
      }

      var startBreakSession = function(){
        countdown = $interval(function(){
          if(Timer.remainingTime > 0){
            Timer.remainingTime--;
          }
          else{
            Timer.breakSession = false;
            resetTimer();
          }
        }, 1000)
      }



      /**
      * @function resetTimer
      * @desc Resets the countdown
      */
      var resetTimer = function(){
        if(countdown){
          $interval.cancel(countdown);
          Timer.isOn = false;
        }
      };


      /**
      * @function startTimer
      * @desc Starts or resets the timer
      */
      Timer.startTimer = function(){
        if(Timer.isOn){
          resetTimer();
          Timer.isOn = false;
          Timer.workSession = false;
          Timer.breakSession = false;
        }
        else{
          Timer.isOn = true;
          if (Timer.breakSession == false && Timer.workSession == false){
            Timer.remainingTime = WORK_SESSION_LENGTH;
            startWorkSession();
          }
          else if (Timer.workSession == false && Timer.breakSession == true && Timer.completedWorkSessions < 4){
            Timer.remainingTime = SHORT_BREAK_LENGTH;
            startBreakSession();
          }
          else if (Timer.workSession == false && Timer.breakSession == true && Timer.completedWorkSessions == 4){
            Timer.remainingTime = LONG_BREAK_LENGTH;
            startBreakSession();
            Timer.completedWorkSessions = 0;
          }
        }
      };



      return Timer;
    }

    angular
        .module('pomodoro')
        .factory('Timer', ['$interval', Timer]);
})();
