import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, ValidationErrors } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { UserService } from "src/app/controllers/user.service";
import User from "src/app/models/user";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const PHONE_REGEX = /\b(0[3|5|7|8|9])+([0-9]{8})\b/;

@Component({
  selector: "app-edit-profile-dialog",
  templateUrl: "./edit-profile-dialog.component.html",
  styleUrls: ["./edit-profile-dialog.component.scss"]
})
export class EditProfileDialogComponent implements OnInit {
  private user: User;

  public nameFormControl = new FormControl("", [Validators.required]);
  public usernameFormControl = new FormControl("", [Validators.required]);
  public passwordFormControl = new FormControl("", [
    Validators.pattern(PASSWORD_REGEX)
  ]);
  public retypedPasswordFormControl = new FormControl("", [
    Validators.pattern(PASSWORD_REGEX),
    (control): ValidationErrors => {
      if (
        this.isUpdatingPassword() &&
        (!control.value || control.value == "")
      ) {
        control.setErrors({ oldPasswordNotInputed: true });
        return;
      }
    }
  ]);
  public emailFormControl = new FormControl("", [Validators.email]);
  public phoneFormControl = new FormControl("", [
    Validators.pattern(PHONE_REGEX)
  ]);
  public addressFormControl = new FormControl("");

  public allFormControl: FormControl[] = [
    this.nameFormControl,
    this.usernameFormControl,
    this.passwordFormControl,
    this.retypedPasswordFormControl,
    this.emailFormControl,
    this.phoneFormControl,
    this.addressFormControl
  ];

  constructor(
    private userService: UserService,
    private dialog: MatDialogRef<EditProfileDialogComponent>
  ) {}

  ngOnInit() {
    this.userService.getLoggedInUser().then(
      user => {
        this.user = user;
        this.usernameFormControl.setValue(user.getUsername());
        this.nameFormControl.setValue(user.getName());
        this.emailFormControl.setValue(user.getEmail());
        this.phoneFormControl.setValue(user.getPhone());
        this.addressFormControl.setValue(user.getAddress());
      },
      error => {
        console.log(error);
        this.dialog.close(null);
      }
    );
  }

  isFormValid(): boolean {
    for (let i = 0; i < this.allFormControl.length; i++) {
      if (!this.allFormControl[i].valid) return false;
    }
    return true;
  }

  isUpdatingPassword(): boolean {
    return (
      this.passwordFormControl.value && this.passwordFormControl.value != ""
    );
  }

  onCancel(): void {
    this.dialog.close(null);
  }

  onUpdateProfile(): void {
    if (!this.isFormValid()) return;
    const newUser = new User(
      this.user.getUserId(),
      this.usernameFormControl.value.trim(),
      this.nameFormControl.value.trim(),
      this.emailFormControl.value.trim(),
      this.phoneFormControl.value.trim(),
      this.addressFormControl.value.trim(),
      this.user.getRole()
    );

    let newPassword = null;
    let oldPassword = null;
    if (this.isUpdatingPassword) {
      newPassword = this.passwordFormControl.value;
      oldPassword = this.retypedPasswordFormControl.value;
    }
    this.userService.updateUser(newUser, newPassword, oldPassword).then(
      () => {
        this.dialog.close(newUser);
      },
      error => {
        console.log(error);
        this.dialog.close(null);
      }
    );
  }
}
