import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Admin from "../models/admin";
import { CookieService } from "ngx-cookie-service";
import { APIS } from "../configs/api-endpoints";

const ACCESS_TOKEN_COOKIE = "accessToken";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private http: HttpClient, private cookie: CookieService) {}

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
      this.http.post(APIS.LOGOUT, { accessToken }).subscribe(
        result => {
          this.cookie.delete(ACCESS_TOKEN_COOKIE);
          resolve(true);
        },
        error => {
          reject(error);
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
              reject(error);
            }
          );
      } else {
        reject("No access token found!");
      }
    });
  }
}
