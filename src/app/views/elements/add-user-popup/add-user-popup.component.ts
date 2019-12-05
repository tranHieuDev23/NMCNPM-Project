import { Component } from "@angular/core";
import { UserService } from "src/app/controllers/user.service";
import Admin from "src/app/models/admin";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-add-user-popup",
  templateUrl: "./add-user-popup.component.html",
  styleUrls: ["./add-user-popup.component.scss"]
})
export class AddUserPopupComponent {
  public username: string = "";
  public password: string = "";
  public email: string = "";
  public phone: string = "";

  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<AddUserPopupComponent>
  ) {}

  onCreateAdmin(): void {
    this.userService
      .addUser(
        new Admin(null, this.username, this.email, this.phone),
        this.password
      )
      .then(
        result => {
          this.dialogRef.close(result);
        },
        error => {
          console.log(error);
          this.dialogRef.close(null);
        }
      );
  }
}
