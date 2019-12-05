import { Component } from "@angular/core";
import { AuthenticationService } from "src/app/controllers/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginPageComponent {
  public username: string = "";
  public password: string = "";

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  onLogin(): void {
    this.authService.login(this.username.trim(), this.password).then(
      result => {
        this.router.navigateByUrl("/admin");
      },
      error => {
        console.log(error);
      }
    );
  }
}
