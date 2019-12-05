import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root"
})
export class RouteLoginGuardService implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    return new Promise<boolean | UrlTree>((resolve, reject) => {
      this.userService.isUserLoggedIn().then(result => {
        if (!result) {
          console.log("No user is logged in!");
          resolve(this.router.parseUrl("/"));
        } else resolve(true);
      });
    });
  }
}
