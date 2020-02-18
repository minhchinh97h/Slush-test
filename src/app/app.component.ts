import { Component } from "@angular/core";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config";
initializeApp(firebaseConfig);

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {}
