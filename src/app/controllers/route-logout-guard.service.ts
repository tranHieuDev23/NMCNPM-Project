import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class RouteLogoutGuardService {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    return new Promise<boolean | UrlTree>((resolve, reject) => {
      this.userService.isUserLoggedIn().then(result => {
        if (result) {
          console.log("User is logged in!");
          resolve(this.router.parseUrl("/admin"));
        } else resolve(true);
      });
    });
  }
}
