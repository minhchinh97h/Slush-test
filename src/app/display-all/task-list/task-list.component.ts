import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { TasksService } from "src/app/tasks.service";
import { Task } from "src/app/shared/task.model";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.css"]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  @Input() searchMethod: string;
  @Input() searchValue: string;
  @Input() updatePipeCount: number = 0;

  constructor(private tasksService: TasksService) {}

  // Get only tasks with completed flag equal false
  getUncompletedTasks(tasks: Task[]) {
    this.tasks = [];
    tasks.forEach((task: Task) => {
      if (!task.completed) {
        this.tasks.push(task);
      }
    });
  }

  ngOnInit(): void {
    const tasks = this.tasksService.getTasks();
    this.getUncompletedTasks(tasks);
    this.tasksService.tasksChanged.subscribe((tasks: Task[]) => {
      this.getUncompletedTasks(tasks);
    });
  }
}
