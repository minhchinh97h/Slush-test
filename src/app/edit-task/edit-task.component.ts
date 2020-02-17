import { Component, OnInit, ViewChild } from "@angular/core";
import { Task } from "../shared/task.model";
import { NgForm } from "@angular/forms";
import { TasksService } from "../tasks.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-edit-task",
  templateUrl: "./edit-task.component.html",
  styleUrls: ["./edit-task.component.css"]
})
export class EditTaskComponent implements OnInit {
  tags: string[] = ["General"];
  tagInput: string = "";
  titleInput: string = "";
  descriptionInput: string = "";
  taskId: string = "";

  @ViewChild("formRef") formRef: NgForm;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const edittingTaskId = this.route.snapshot.params["id"];

    const tasks = this.tasksService.getTasks();
    const taskIndex = tasks.findIndex(
      (task: Task) => task.id === edittingTaskId
    );

    if (taskIndex > -1) {
      this.tags = tasks[taskIndex].tags;
      this.titleInput = tasks[taskIndex].title;
      this.descriptionInput = tasks[taskIndex].description;

      this.taskId = tasks[taskIndex].id;
    } else {
      this.router.navigate(["/not-found"]);
    }
  }

  onAddTag(event: KeyboardEvent): void {
    if (event.key === "Enter" || event.keyCode === 13) {
      const entered_tags = this.tagInput.trim().split(/\s*,\s*/);
      this.tags = this.tags.concat(
        entered_tags.filter((tag: string) => {
          return tag.length > 0;
        })
      );

      this.tagInput = "";
    }
  }

  onReceiveDeletedTagIndex(deletedTagIndex: number): void {
    if (deletedTagIndex !== 0) {
      this.tags.splice(deletedTagIndex, 1);
    }
  }

  resetForm(): void {
    this.formRef.reset();
    this.tags = ["General"];
  }

  onEditTask(): void {
    const edittedTask: Task = {
      id: this.taskId,
      title: this.titleInput,
      description: this.descriptionInput,
      tags: this.tags,
      dateObj: {
        day: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear()
      }
    };

    this.tasksService.updateTask(edittedTask);
    this.resetForm();
    this.router.navigate(["/display-all"]);
  }

  // Prevent submitting form when hit "Enter"
  onKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.keyCode === 13) {
      event.preventDefault();
    }
  }
}
