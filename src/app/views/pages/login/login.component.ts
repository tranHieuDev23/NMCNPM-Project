import { Component } from "@angular/core";
import { UserService } from "src/app/controllers/user.service";
import { Router, ActivatedRoute } from "@angular/router";

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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getReturnUrl(): string {
    return this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  onLogin(): void {
    this.userService.login(this.username.trim(), this.password).then(
      () => {
        const returnUrl = this.getReturnUrl();
        this.router.navigateByUrl(returnUrl);
      },
      error => {
        console.log(error);
      }
    );
  }
}
