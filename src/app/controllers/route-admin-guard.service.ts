import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { UserRole } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class RouteAdminGuardService {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    return new Promise<boolean | UrlTree>((resolve, reject) => {
      this.userService.getLoggedInUser().then(
        value => {
          if (value && value.getRole() == UserRole.ADMIN) {
            resolve(true);
          } else {
            resolve(this.router.parseUrl("/"));
          }
        },
        error => {
          console.log(error);
          resolve(this.router.parseUrl("/"));
        }
      );
    });
  }
}
