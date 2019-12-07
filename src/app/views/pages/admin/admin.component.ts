import { Component, OnInit, ViewChild } from "@angular/core";
import Admin from "src/app/models/admin";
import { UserService } from "src/app/controllers/user.service";
import { MatDialog } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";
import { YesNoPopupComponent } from "../../elements/yes-no-popup/yes-no-popup.component";
import {
  FormDialogComponent,
  FormControlItem
} from "../../elements/form-dialog/form-dialog.component";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminPageComponent implements OnInit {
  @ViewChild("table", { static: false }) table: MatTable<any>;
  public admins: Admin[] = [];
  public columnsToDisplay: string[] = ["name", "phone", "email", "edit"];

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit() {
    this.userService.getAllUSer().then(
      result => {
        this.admins = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  onCreateAdmin(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: "600px",
      data: {
        name: "Điền thông tin để tạo quản trị viên mới",
        items: [
          new FormControlItem("input", "Username", "text", "username"),
          new FormControlItem("input", "Mật khẩu", "password", "password"),
          new FormControlItem("input", "Email", "email", "email"),
          new FormControlItem("input", "Số điện thoại", "tel", "phone")
        ],
        completedText: "Hoàn tất",
        cancelText: "Hủy bỏ"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService
          .addUser(Admin.fromJSON(result), result.password)
          .then(admin => {
            this.admins.push(admin);
            this.table.renderRows();
          }, error => {
            console.log(error);
          });
      }
    });
  }

  onRemoveAdmin(admin: Admin): void {
    this.dialog
      .open(YesNoPopupComponent)
      .afterClosed()
      .subscribe(result => {
        if (!result) return;
        this.userService.removeUser(admin).then(
          () => {
            this.admins = this.admins.filter(value => {
              return value.getAdminId() != admin.getAdminId();
            });
            this.table.renderRows();
          },
          error => {
            console.log(error);
          }
        );
      });
  }
}
