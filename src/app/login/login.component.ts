import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { auth } from "firebase";

let authListener = null;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  emailInput: string = "";
  passwordInput: string = "";
  passwordOk: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    authListener = auth().onAuthStateChanged((user: firebase.User) => {
      if (user) {
        this.router.navigate(["/display-all"]);
      } else {
      }
    });
  }

  ngOnDestroy(): void {
    if (authListener) {
      authListener();
    }
  }

  onCreateNewAccount() {
    this.router.navigate(["/signup"]);
  }

  onLogin() {
    auth()
      .signInWithEmailAndPassword(this.emailInput, this.passwordInput)
      .then((userCredential: auth.UserCredential) => {
        this.router.navigate(["/display-all"]);
      })
      .catch(err => {
        alert(err);
      });
  }
}
