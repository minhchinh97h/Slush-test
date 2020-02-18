import { Component, OnInit, Input, Output } from "@angular/core";
import { Task } from "src/app/shared/task.model";
import { TasksService } from "src/app/tasks.service";

@Component({
  selector: "app-completed-task-list",
  templateUrl: "./completed-task-list.component.html",
  styleUrls: ["./completed-task-list.component.css"]
})
export class CompletedTaskListComponent implements OnInit {
  completedTasks: Task[] = [];
  @Input() searchMethod: string;
  @Input() searchValue: string;
  @Input() updatePipeCount: number = 0;

  constructor(private tasksService: TasksService) {}

  // Get only tasks with completed flag equal true
  getCompletedTasks(tasks: Task[]) {
    this.completedTasks = [];
    tasks.forEach((task: Task) => {
      if (task.completed) {
        this.completedTasks.push(task);
      }
    });
  }

  ngOnInit(): void {
    const tasks = this.tasksService.getTasks();
    this.getCompletedTasks(tasks);

    this.tasksService.tasksChanged.subscribe((tasks: Task[]) => {
      this.getCompletedTasks(tasks);
      this.updatePipeCount += 1;
    });
  }
}
