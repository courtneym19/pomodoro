(function() {
  function Task($firebaseArray) {

    var ref = firebase.database().ref().child("tasks");
    var tasks = $firebaseArray(ref);

    return {
      all: tasks,
      addTask: function(){
        tasks.$add({task: this.newTaskName})
      }
    }
  }

  angular
    .module('pomodoro')
    .factory('Task', ['$firebaseArray', Task]);
})();
