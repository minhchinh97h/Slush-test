import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-tags",
  templateUrl: "./tags.component.html",
  styleUrls: ["./tags.component.css"]
})
export class TagsComponent implements OnInit {
  @Input() tags: string[] = [];
  @Output() receiveDeletedTagIndex = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  onReceiveDeletedTagIndex(deletedTagIndex: number) {
    this.receiveDeletedTagIndex.emit(deletedTagIndex);
  }
}
