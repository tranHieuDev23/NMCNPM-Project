import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Admin from "../models/admin";
import { CookieService } from "ngx-cookie-service";
import { APIS } from "../configs/api-endpoints";
import { EventEmitter } from 'events';
import { BehaviorSubject } from 'rxjs';

const ACCESS_TOKEN_COOKIE = "accessToken";

@Injectable({
  providedIn: "root"
})
export class UserService {
  public currentUser: BehaviorSubject<Admin> = new BehaviorSubject<Admin>(null);

  constructor(private http: HttpClient, private cookie: CookieService) {
    this.getLoggedInUser().then((result) => {
      this.currentUser.next(result);
    }, (error) => { 
      console.log(error);
    });
  }

  login(username: string, password: string): Promise<Admin> {
    return new Promise((resolve, reject) => {
      this.http
        .post<any>(APIS.LOGIN_API, { username, password })
        .subscribe(
          result => {
            const admin = Admin.fromJSON(result.admin);
            const accessToken = result.accessToken;
            this.cookie.set(ACCESS_TOKEN_COOKIE, accessToken);
            this.currentUser.next(admin);
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
      this.http.post(APIS.LOGOUT_API, { accessToken }).subscribe(
        () => {
          resolve(true);
          this.currentUser.next(null);
        },
        () => {
          resolve(false);
          this.currentUser.next(null);
        }
      );
    });
  }

  getLoggedInUser(): Promise<Admin> {
    return new Promise((resolve, reject) => {
      const accessToken = this.cookie.get(ACCESS_TOKEN_COOKIE);
      if (accessToken) {
        this.http
          .post<any>(APIS.RETRIEVE_USER_API, { accessToken })
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

  isUserLoggedIn(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.getLoggedInUser().then((result) => {
        resolve(result != null);
      }, (error) => {
        console.log(error);
        resolve(false);
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
        .post<Admin[]>(APIS.RETRIEVE_USERS_API, { accessToken })
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
        .post<Admin>(APIS.ADD_USER_API, { admin, password, accessToken })
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
        .post<Admin>(APIS.UPDATE_USER_API, { admin, accessToken })
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
        .post<Admin>(APIS.REMOVE_USER_API, { admin, accessToken })
        .toPromise()
        .then(resolve, reject);
    });
  }
}
