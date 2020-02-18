import { Component } from "@angular/core";

// Initialize firebase along with the App component
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "../config";
firebase.initializeApp(firebaseConfig);

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {}
