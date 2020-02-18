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

  // Choose separate filtering options: name or tags.
  // Call update on filtering pipe by incrementing updatePipeCount
  onChooseSearchMethod(method: string) {
    if (method !== this.chosenSearchMethod) {
      this.chosenSearchMethod = method;
      this.searchValue = "";
      this.updatePipeCount += 1; // Trigger piping
    }
  }

  // Trigger piping
  onSearch() {
    this.updatePipeCount += 1;
  }

  // Instead of pressing the 'Search' button, can simply hit 'Enter'
  onKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.onSearch();
    }
  }
}
