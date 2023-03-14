interface Task {
  id: number;
  name: string;
}

class TaskManager {
  private tasks: Task[] = [];
  private idCounter: number = 1;
  
  constructor(private inputField: HTMLInputElement, private listContainer: HTMLUListElement) {}
  
  addTask(): void {
    const taskName = this.inputField.value;
    if (!taskName) return;
    
    const task: Task = { id: this.idCounter++, name: taskName };
    this.tasks.push(task);
    
    this.inputField.value = "";
    this.renderList();
  }
  
  removeTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.renderList();
  }
  
  updateTask(id: number, newName: string): void {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return;
    
    this.tasks[taskIndex].name = newName;
    this.renderList();
  }
  
  private renderList(): void {
    this.listContainer.innerHTML = "";
    this.tasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = task.name;
      
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => this.removeTask(task.id));
      
      const updateButton = document.createElement("button");
      updateButton.textContent = "Update";
      updateButton.addEventListener("click", () => {
        const newName = prompt("Enter new task name:");
        if (newName) this.updateTask(task.id, newName);
      });
      
      li.appendChild(removeButton);
      li.appendChild(updateButton);
      
      this.listContainer.appendChild(li);
    });
  }
}

const inputField = document.getElementById("input") as HTMLInputElement;
const listContainer = document.getElementById("list") as HTMLUListElement;
const taskManager = new TaskManager(inputField, listContainer);

document.getElementById("add-button").addEventListener("click", () => taskManager.addTask());
