import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-display-all",
  templateUrl: "./display-all.component.html",
  styleUrls: ["./display-all.component.css"]
})
export class DisplayAllComponent implements OnInit {
  chosenSearchMethod: string = "name";
  searchValue: string = "";
  updatePipeCount: number = 0;
  constructor() {}

  ngOnInit(): void {}

  onChooseSearchMethod(method: string) {
    this.chosenSearchMethod = method;
    this.searchValue = "";
  }

  onSearch() {
    this.updatePipeCount += 1;
  }
}
