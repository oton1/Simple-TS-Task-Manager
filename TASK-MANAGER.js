var TaskManager = /** @class */ (function() {
  function TaskManager(inputField, listContainer) {
    this.inputField = inputField;
    this.listContainer = listContainer;
    this.tasks = [];
    this.idCounter = 1;
  }
  TaskManager.prototype.addTask = function() {
    var taskName = this.inputField.value;
    if (!taskName)
      return;
    var task = { id: this.idCounter++, name: taskName };
    this.tasks.push(task);
    this.inputField.value = "";
    this.renderList();
  };
  TaskManager.prototype.removeTask = function(id) {
    this.tasks = this.tasks.filter(function(task) { return task.id !== id; });
    this.renderList();
  };
  TaskManager.prototype.updateTask = function(id, newName) {
    var taskIndex = this.tasks.findIndex(function(task) { return task.id === id; });
    if (taskIndex === -1)
      return;
    this.tasks[taskIndex].name = newName;
    this.renderList();
  };
  TaskManager.prototype.renderList = function() {
    var _this = this;
    this.listContainer.innerHTML = "";
    this.tasks.forEach(function(task) {
      var li = document.createElement("li");
      li.textContent = task.name;
      var removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", function() { return _this.removeTask(task.id); });
      var updateButton = document.createElement("button");
      updateButton.textContent = "Update";
      updateButton.addEventListener("click", function() {
        var newName = prompt("Enter new task name:");
        if (newName)
          _this.updateTask(task.id, newName);
      });
      li.appendChild(removeButton);
      li.appendChild(updateButton);
      _this.listContainer.appendChild(li);
    });
  };
  return TaskManager;
}());
var inputField = document.getElementById("input");
var listContainer = document.getElementById("list");
var taskManager = new TaskManager(inputField, listContainer);
document.getElementById("add-button").addEventListener("click", function() { return taskManager.addTask(); });
