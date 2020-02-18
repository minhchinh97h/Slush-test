import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { TasksService } from "src/app/tasks.service";
import { Task } from "src/app/shared/task.model";

@Component({
  selector: "app-completed-task-item",
  templateUrl: "./completed-task-item.component.html",
  styleUrls: ["./completed-task-item.component.css"]
})
export class CompletedTaskItemComponent implements OnInit {
  @Input() completedTask: Task;

  constructor(private router: Router, private tasksService: TasksService) {}

  ngOnInit(): void {}

  onClickEditTask() {
    this.router.navigate(["/edit-task", this.completedTask.id]);
  }

  onClickDeleteTask() {
    this.tasksService.deleteTask(this.completedTask.id);
  }

  onUncompleteTask() {
    this.completedTask.completed = false;
    this.tasksService.updateTask(this.completedTask);
  }
}
