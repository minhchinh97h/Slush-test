import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter
} from "@angular/core";

@Component({
  selector: "app-tag",
  templateUrl: "./tag.component.html",
  styleUrls: ["./tag.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class TagComponent implements OnInit {
  @Input() tag: string;
  @Input() tagIndex: number;

  @Output() receiveDeletedTagIndex = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  onDeleteTag() {
    this.receiveDeletedTagIndex.emit(this.tagIndex);
  }
}
