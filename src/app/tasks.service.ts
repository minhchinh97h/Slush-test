import { EventEmitter } from "@angular/core";
import { Task } from "./shared/task.model";
export class TasksService {
  tasksChanged = new EventEmitter<Task[]>();

  private tasks: Task[] = [];

  getTasks() {
    return this.tasks.slice();
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.tasksChanged.emit(this.getTasks());
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task: Task) => task.id !== id);
    this.tasksChanged.emit(this.getTasks());
  }

  updateTask(updatedTask: Task) {
    const index = this.tasks.findIndex(
      (task: Task) => task.id === updatedTask.id
    );

    if (index > -1) {
      this.tasks[index] = updatedTask;
      this.tasksChanged.emit(this.getTasks());
    }
  }
}
