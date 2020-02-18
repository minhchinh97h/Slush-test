import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { auth } from "firebase";

@Injectable()
export class AppGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    auth().onAuthStateChanged(
      (user: firebase.User) => {
        // If logged in, we navigate to /display-all
        if (user) {
          this.router.navigate(["/display-all"]);
        } else {
          return true;
        }
      },
      (error: auth.Error) => {
        this.router.navigate(["/display-all"]);
      }
    );
    return true;
  }
}
