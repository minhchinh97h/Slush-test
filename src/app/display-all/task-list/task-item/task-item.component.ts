import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";
import { Task } from "src/app/shared/task.model";
import { Router } from "@angular/router";
import { TasksService } from "src/app/tasks.service";

@Component({
  selector: "app-task-item",
  templateUrl: "./task-item.component.html",
  styleUrls: ["./task-item.component.css"],
  encapsulation: ViewEncapsulation.Emulated
})
export class TaskItemComponent implements OnInit {
  @Input() taskItem: Task;

  constructor(private router: Router, private tasksService: TasksService) {}

  ngOnInit(): void {}

  onClickEditTask() {
    this.router.navigate(["/edit-task", this.taskItem.id]);
  }

  onClickDeleteTask() {
    this.tasksService.deleteTask(this.taskItem.id);
  }
}
