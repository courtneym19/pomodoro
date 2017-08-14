(function() {
    function Timer($interval) {
      var Timer = {};

      Timer.isOn = false;

      Timer.isWorkSession = false;

      Timer.isBreakSession = false;

      Timer.remainingTime = null;

      Timer.completedWorkSessions = 0;

      var countdown;

      var ding = new buzz.sound("/sounds/Ding.mp3", {
          formats: ['mp3'],
          preload: true
      });


      const WORK_SESSION_LENGTH = 1;
      const SHORT_BREAK_LENGTH = 1;
      const LONG_BREAK_LENGTH = 1;


      /** Starts a 25:00 work session*/
      var startWorkSession = function(){
        countdown = $interval(function(){
          if(Timer.remainingTime > 0){
            Timer.remainingTime--;
          }
          else if (Timer.remainingTime <= 0 && !Timer.isBreakSession){
            ding.play();
            console.log("ding");
            resetTimer();
            Timer.isWorkSession = false;
            Timer.isBreakSession = true;
            Timer.completedWorkSessions++;
          }
        }, 1000);
      }

      /**Starts a 5:00 or 30:00 break session*/
      var startBreakSession = function(){
        countdown = $interval(function(){
          if(Timer.remainingTime > 0){
            Timer.remainingTime--;
          }
          else{
            ding.play();
            Timer.isBreakSession = false;
            resetTimer();
          }
        }, 1000);
      }



      var resetTimer = function(){
        if(countdown){
          $interval.cancel(countdown);
          Timer.isOn = false;
        }
      };


      /**Starts or resets the timer and tells the timer whether to start a work or break session*/
      Timer.startTimer = function(){
        if(Timer.isOn){
          resetTimer();
          Timer.isOn = false;
          Timer.isWorkSession = false;
          Timer.isBreakSession = false;
        }
        else{
          Timer.isOn = true;
          if (Timer.isBreakSession == false && Timer.isWorkSession == false){
            Timer.remainingTime = WORK_SESSION_LENGTH;
            startWorkSession();
          }
          else if (Timer.isWorkSession == false && Timer.isBreakSession == true && Timer.completedWorkSessions < 4){
            Timer.remainingTime = SHORT_BREAK_LENGTH;
            startBreakSession();
          }
          else if (Timer.isWorkSession == false && Timer.isBreakSession == true && Timer.completedWorkSessions == 4){
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
