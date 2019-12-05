import { Component } from "@angular/core";
import { UserService } from "src/app/controllers/user.service";
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
    private userService: UserService,
    private router: Router
  ) {}

  onLogin(): void {
    this.userService.login(this.username.trim(), this.password).then(
      result => {
        this.router.navigateByUrl("/admin");
      },
      error => {
        console.log(error);
      }
    );
  }
}
