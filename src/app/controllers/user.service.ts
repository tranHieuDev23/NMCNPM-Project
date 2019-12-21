import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import User from "../models/user";
import { CookieService } from "ngx-cookie-service";
import { APIS } from "../configs/api-endpoints";
import { BehaviorSubject } from "rxjs";

const ACCESS_TOKEN_COOKIE = "accessToken";

@Injectable({
  providedIn: "root"
})
export class UserService {
  public currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private cookie: CookieService) {
    this.getLoggedInUser().then(
      result => {
        this.currentUser.next(result);
      },
      error => {
        console.log(error);
      }
    );
  }

  getAccessToken(): string {
    return this.getAccessToken();
  }

  login(username: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http
        .post<any>(APIS.LOGIN_API, { username, password })
        .subscribe(
          result => {
            const admin = User.fromJSON(result.admin);
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
      const accessToken = this.getAccessToken();
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

  getLoggedInUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      const accessToken = this.getAccessToken();
      if (accessToken) {
        this.http
          .post<any>(APIS.RETRIEVE_USER_API, { accessToken })
          .subscribe(
            (result: any) => {
              const admin = User.fromJSON(result);
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
    return new Promise<boolean>(resolve => {
      this.getLoggedInUser().then(
        result => {
          resolve(result != null);
        },
        error => {
          console.log(error);
          resolve(false);
        }
      );
    });
  }

  getAllUSer(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      const accessToken = this.getAccessToken();
      if (!accessToken) {
        reject("No access token found!");
        return;
      }
      this.http
        .post<User[]>(APIS.RETRIEVE_USERS_API, { accessToken })
        .toPromise()
        .then(
          result => {
            const users = [];
            result.forEach(element => {
              users.push(User.fromJSON(element));
            });
            resolve(users);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  addUser(user: User, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http
        .post<User>(APIS.ADD_USER_API, { user, password })
        .toPromise()
        .then(
          result => {
            const createdUser = User.fromJSON(result);
            if (createdUser) resolve(createdUser);
            else reject("Error while deserialize response!");
          },
          error => {
            reject(error);
          }
        );
    });
  }

  updateUser(user: User): Promise<void> {
    return new Promise((resolve, reject) => {
      const accessToken = this.getAccessToken();
      if (!accessToken) {
        reject("No access token found!");
        return;
      }
      this.http
        .post<User>(APIS.UPDATE_USER_API, { user, accessToken })
        .toPromise()
        .then(
          () => {
            resolve();
          },
          error => {
            reject(error);
          }
        );
    });
  }

  removeUser(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      const accessToken = this.getAccessToken();
      if (!accessToken) {
        reject("No access token found!");
        return;
      }
      this.http
        .post<User>(APIS.REMOVE_USER_API, { user: user, accessToken })
        .toPromise()
        .then(resolve, reject);
    });
  }
}
