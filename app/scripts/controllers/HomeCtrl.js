(function() {
    function HomeCtrl(Timer, Task) {

      this.timer = Timer;

      this.tasks = Task.all;
      this.addTask = Task.addTask;
      this.newTaskName = "";


    }


    angular
        .module('pomodoro')
        .controller('HomeCtrl', ['Timer', 'Task', HomeCtrl]);
})();
