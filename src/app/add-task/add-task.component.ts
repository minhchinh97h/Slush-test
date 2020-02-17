import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { TasksService } from "../tasks.service";
import { Task } from "../shared/task.model";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.css"]
})
export class AddTaskComponent implements OnInit {
  tags: string[] = ["General"];
  tagInput: string = "";
  titleInput: string = "";
  descriptionInput: string = "";

  @ViewChild("formRef") formRef: NgForm;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {}

  onAddTag(event: KeyboardEvent): void {
    if (event.key === "Enter" || event.keyCode === 13) {
      // ADD TAG
      const enteredTags = this.tagInput.trim().split(/\s*,\s*/);
      this.tags = this.tags.concat(
        enteredTags.filter((tag: string) => {
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

  onCreateTask(): void {
    const newTask: Task = {
      id: "t-" + Date.now(),
      title: this.titleInput,
      description: this.descriptionInput,
      dateObj: {
        day: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear()
      },
      tags: this.tags
    };

    this.tasksService.addTask(newTask);
    this.resetForm();
  }

  // Prevent submitting form when hit "Enter"
  onKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.keyCode === 13) {
      event.preventDefault();
    }
  }
}
