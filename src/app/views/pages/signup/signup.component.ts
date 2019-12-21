import { Component } from "@angular/core";
import { ALL_CITY_REGIONS } from "../../../configs/regions";
import { UserService } from "src/app/controllers/user.service";
import User, { UserRole } from "src/app/models/user";
import { FormControl, Validators, AbstractControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router, ActivatedRoute } from "@angular/router";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const PHONE_REGEX = /\b(0[3|5|7|8|9])+([0-9]{8})\b/;

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignUpPageComponent {
  public address: string = "";

  public nameFormControl = new FormControl("", [Validators.required]);
  public usernameFormControl = new FormControl("", [Validators.required]);
  public passwordFormControl = new FormControl("", [
    Validators.required,
    Validators.pattern(PASSWORD_REGEX)
  ]);
  public retypedPasswordFormControl = new FormControl("", [
    Validators.required,
    (control: AbstractControl) => {
      return Validators.pattern(this.passwordFormControl.value)(control);
    }
  ]);
  public emailFormControl = new FormControl("", [Validators.email]);
  public phoneFormControl = new FormControl("", [
    Validators.pattern(PHONE_REGEX)
  ]);

  public allFormControl: FormControl[] = [
    this.nameFormControl,
    this.usernameFormControl,
    this.passwordFormControl,
    this.retypedPasswordFormControl,
    this.emailFormControl,
    this.phoneFormControl
  ];

  public allRegions: string[] = ALL_CITY_REGIONS;

  constructor(
    private userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.passwordFormControl.valueChanges.subscribe(() => {
      this.retypedPasswordFormControl.updateValueAndValidity();
    });
  }

  isFormValid(): boolean {
    for (let i = 0; i < this.allFormControl.length; i++) {
      if (!this.allFormControl[i].valid) return false;
    }
    return true;
  }

  getReturnUrl(): string {
    return this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  onSignUp(): void {
    if (!this.isFormValid()) return;
    const newUser: User = new User(
      null,
      this.usernameFormControl.value,
      this.nameFormControl.value,
      this.emailFormControl.value,
      this.phoneFormControl.value,
      this.address.trim(),
      UserRole.USER
    );
    const password: string = this.passwordFormControl.value;
    this.userService.addUser(newUser, password).then(
      user => {
        this.userService.login(user.getUsername(), password).then(
          () => {
            const returnUrl = this.getReturnUrl();
            this.router.navigateByUrl(returnUrl);
          },
          error => {
            console.log(error);
            this.snackbar.open(
              "Có lỗi xảy ra trong quá trình đăng nhập!",
              null,
              {
                duration: 3000
              }
            );
          }
        );
      },
      error => {
        console.log(error);
        this.snackbar.open("Có lỗi xảy ra trong quá trình đăng nhập!", null, {
          duration: 3000
        });
      }
    );
  }
}
