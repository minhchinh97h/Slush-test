import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.css"]
})
export class AddTaskComponent implements OnInit {
  tags: string[] = [];
  tagInput: string = "";
  @ViewChild("tagRef") tagRef: ElementRef;
  @ViewChild("formRef") formRef: NgForm;

  constructor() {}

  ngOnInit(): void {}

  onAddTag(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      // ADD TAG
      const entered_tags = this.tagInput.trim().split(/\s*,\s*/);
      this.tags = this.tags.concat(
        entered_tags.filter((tag: string) => {
          return tag.length > 0;
        })
      );

      this.tagRef.nativeElement.value = "";
    }
  }

  onReceiveDeletedTagIndex(deletedTagIndex: number): void {
    this.tags.splice(deletedTagIndex, 1);
  }

  onCreateTask(event: Event): void {
    event.preventDefault()
    console.log(this.formRef)
  }
}
