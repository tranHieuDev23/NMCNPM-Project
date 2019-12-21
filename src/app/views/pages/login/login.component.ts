import { Component } from "@angular/core";
import { UserService } from "src/app/controllers/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

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
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {}

  getReturnUrl(): string {
    return this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  onLogin(): void {
    this.userService.login(this.username.trim(), this.password).then(
      result => {
        const returnUrl = this.getReturnUrl();
        this.router.navigateByUrl(returnUrl);
        this.snackbar.open(`Xin chào ${result.getName()}`, null, {
          duration: 3000
        });
      },
      error => {
        console.log(error);
        if (error.status == 403)
          this.snackbar.open("Sai tên đăng nhập hoặc mật khẩu!");
        else this.snackbar.open("Có lỗi trong quá trình đăng nhập!");
      }
    );
  }

  onSignUp(): void {
    this.router.navigate(["signup"], {
      queryParams: { returnUrl: this.getReturnUrl() }
    });
  }
}
