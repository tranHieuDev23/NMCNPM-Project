import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Admin from "../models/admin";
import { CookieService } from "ngx-cookie-service";
import { APIS } from "../configs/api-endpoints";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";

const ACCESS_TOKEN_COOKIE = "accessToken";

@Injectable({
  providedIn: "root"
})
export class UserService implements CanActivate {
  constructor(private http: HttpClient, private cookie: CookieService, private router: Router) {}

  login(username: string, password: string): Promise<Admin> {
    return new Promise((resolve, reject) => {
      this.http
        .post<any>(APIS.LOGIN, { username, password })
        .subscribe(
          result => {
            const admin = Admin.fromJSON(result.admin);
            const accessToken = result.accessToken;
            this.cookie.set(ACCESS_TOKEN_COOKIE, accessToken);
            resolve(admin);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      const accessToken = this.cookie.get(ACCESS_TOKEN_COOKIE);
      if (!accessToken) {
        reject("No access token found!");
        return;
      }
      this.cookie.delete(ACCESS_TOKEN_COOKIE);
      this.http.post(APIS.LOGOUT, { accessToken }).subscribe(
        () => {
          resolve(true);
        },
        () => {
          resolve(false);
        }
      );
    });
  }

  getLoggedInUser(): Promise<Admin> {
    return new Promise((resolve, reject) => {
      const accessToken = this.cookie.get(ACCESS_TOKEN_COOKIE);
      if (accessToken) {
        this.http
          .post<any>(APIS.RETRIEVE_USER, { accessToken })
          .subscribe(
            (result: any) => {
              const admin = Admin.fromJSON(result);
              if (admin) {
                resolve(admin);
              } else {
                reject("Error while deserialize response!");
              }
            },
            error => {
              this.cookie.delete(ACCESS_TOKEN_COOKIE);
              reject(error);
            }
          );
      } else {
        reject("No access token found!");
      }
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    return new Promise<boolean | UrlTree>((resolve) => {
      this.getLoggedInUser().then(result => {
        resolve(true);
      }, (error) => {
        console.log(error);
        resolve(this.router.parseUrl('/'));
      });
    });
  }

  getAllUSer(): Promise<Admin[]> {
    return new Promise((resolve, reject) => {
      const accessToken = this.cookie.get(ACCESS_TOKEN_COOKIE);
      if (!accessToken) {
        reject("No access token found!");
        return;
      }
      this.http
        .post<Admin[]>(APIS.RETRIEVE_USERS, { accessToken })
        .toPromise()
        .then(
          result => {
            const admins = [];
            result.forEach(element => {
              admins.push(Admin.fromJSON(element));
            });
            resolve(admins);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  addUser(admin: Admin, password: string): Promise<Admin> {
    return new Promise((resolve, reject) => {
      const accessToken = this.cookie.get(ACCESS_TOKEN_COOKIE);
      if (!accessToken) {
        reject("No access token found!");
        return;
      }
      this.http
        .post<Admin>(APIS.ADD_USER, { admin, password, accessToken })
        .toPromise()
        .then(
          result => {
            const createdAdmin = Admin.fromJSON(result);
            if (createdAdmin) resolve(createdAdmin);
            else reject("Error while deserialize response!");
          },
          error => {
            reject(error);
          }
        );
    });
  }

  updateUser(admin: Admin): Promise<Admin> {
    return new Promise((resolve, reject) => {
      const accessToken = this.cookie.get(ACCESS_TOKEN_COOKIE);
      if (!accessToken) {
        reject("No access token found!");
        return;
      }
      this.http
        .post<Admin>(APIS.UPDATE_USER, { admin, accessToken })
        .toPromise()
        .then(
          result => {
            const createdAdmin = Admin.fromJSON(result);
            if (createdAdmin) resolve(createdAdmin);
            else reject("Error while deserialize response!");
          },
          error => {
            reject(error);
          }
        );
    });
  }

  removeUser(admin: Admin): Promise<any> {
    return new Promise((resolve, reject) => {
      const accessToken = this.cookie.get(ACCESS_TOKEN_COOKIE);
      if (!accessToken) {
        reject("No access token found!");
        return;
      }
      this.http
        .post<Admin>(APIS.REMOVE_USER, { admin, accessToken })
        .toPromise()
        .then(resolve, reject);
    });
  }
}
