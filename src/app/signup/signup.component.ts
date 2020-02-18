import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { auth } from "firebase";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  emailInput: string = "";
  passwordInput: string = "";

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onCreateNewAccount() {
    auth()
      .createUserWithEmailAndPassword(this.emailInput, this.passwordInput)
      .then((userCredential: firebase.auth.UserCredential) => {
        this.router.navigate(["/display-all"]);
      })
      .catch(err => {
        // Handle error
        alert(err);
      });
  }

  onGoToLogin() {
    this.router.navigate(["/login"]);
  }

  // To check password if it contains at least 1 number and 6 characters
  checkPassword(password: string): boolean {
    return (
      /\d/.test(password) && /[a-zA-Z]/.test(password) && password.length >= 6
    );
  }
}
