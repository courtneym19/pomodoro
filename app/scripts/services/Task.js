(function() {
  function Task($firebaseArray) {

    var ref = firebase.database().ref().child("tasks");
    var tasks = $firebaseArray(ref);

    return {
      all: tasks,
      addTask: function(){
        var form = document.getElementById('task-name');
        tasks.$add({task: this.newTaskName, createdOn: firebase.database.ServerValue.TIMESTAMP});
        form.value = '';
      }
    }
  }

  angular
    .module('pomodoro')
    .factory('Task', ['$firebaseArray', Task]);
})();
