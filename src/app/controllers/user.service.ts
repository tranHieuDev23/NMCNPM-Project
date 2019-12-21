import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import User, { UserRole } from "../models/user";
import { CookieService } from "ngx-cookie-service";
import { APIS } from "../configs/api-endpoints";

const ACCESS_TOKEN_COOKIE = "accessToken";

@Injectable({
  providedIn: "root"
})
export class UserService {
  public currentUserChanged: EventEmitter<User> = new EventEmitter<User>();
  public currentUserUpdated: EventEmitter<User> = new EventEmitter<User>();
  private currentUser: User = null;

  constructor(private http: HttpClient, private cookie: CookieService) {
    this.getLoggedInUser().then(
      result => {
        this.changeCurrentUser(result);
      },
      error => {
        console.log(error);
      }
    );
  }

  private changeCurrentUser(user: User): void {
    this.currentUserChanged.next(user);
    this.currentUser = user;
  }

  getAccessToken(): string {
    return this.cookie.get(ACCESS_TOKEN_COOKIE);
  }

  login(username: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http
        .post<any>(APIS.LOGIN_API, { username, password })
        .subscribe(
          result => {
            const user = User.fromJSON(result.user);
            const accessToken = result.accessToken;
            this.cookie.set(ACCESS_TOKEN_COOKIE, accessToken);
            this.changeCurrentUser(user);
            resolve(user);
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
          this.changeCurrentUser(null);
        },
        () => {
          resolve(false);
          this.changeCurrentUser(null);
        }
      );
    });
  }

  getLoggedInUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      if (this.currentUser) {
        resolve(this.currentUser);
        return;
      }
      const accessToken = this.getAccessToken();
      if (accessToken) {
        this.http
          .post<any>(APIS.RETRIEVE_USER_API, { accessToken })
          .subscribe(
            (result: any) => {
              const user = User.fromJSON(result);
              if (user) {
                resolve(user);
              } else {
                this.cookie.delete(ACCESS_TOKEN_COOKIE);
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

  getAllUser(role: UserRole = null): Promise<User[]> {
    return new Promise((resolve, reject) => {
      const accessToken = this.getAccessToken();
      if (!accessToken) {
        reject("No access token found!");
        return;
      }
      this.http
        .post<User[]>(APIS.RETRIEVE_USERS_API, { accessToken, role })
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

  updateUser(user: User, newPassword: string = null, oldPassword: string = null): Promise<void> {
    return new Promise((resolve, reject) => {
      const accessToken = this.getAccessToken();
      if (!accessToken) {
        reject("No access token found!");
        return;
      }
      this.http
        .post<User>(APIS.UPDATE_USER_API, { user, newPassword, oldPassword, accessToken })
        .toPromise()
        .then(
          () => {
            this.changeCurrentUser(user);
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
