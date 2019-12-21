import { Component, OnInit, ViewChild } from "@angular/core";
import User from "src/app/models/user";
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
  public admins: User[] = [];
  public columnsToDisplay: string[] = ["name", "phone", "email", "edit"];

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit() {
    this.initAdmins();
  }

  initAdmins(): void {
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
        title: "Điền thông tin để tạo quản trị viên mới",
        items: [
          new FormControlItem({placeholder: "Username", name: "username"}),
          new FormControlItem({placeholder: "Mật khẩu", type: "password", name: "password"}),
          new FormControlItem({placeholder: "Email", type: "email", name: "email"}),
          new FormControlItem({placeholder: "Số điện thoại", type: "tel", name: "phone"})
        ],
        completedText: "Hoàn tất",
        cancelText: "Hủy bỏ"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService
          .addUser(User.fromJSON(result), result.password)
          .then(admin => {
            this.admins.push(admin);
            this.table.renderRows();
          }, error => {
            console.log(error);
          });
      }
    });
  }

  onUpdateAdmin(admin: User): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '600px',
      data: {
        title: `Cập nhật thông tin của quản trị viên ${admin.getUsername()}`,
        items: [
          new FormControlItem({placeholder: "Username", name: "username", value: admin.getUsername()}),
          new FormControlItem({placeholder: "Email", type: "email", name: "email", value: admin.getEmail()}),
          new FormControlItem({placeholder: "Số điện thoại", type: "tel", name: "phone", value: admin.getPhone()})
        ],
        completedText: "Hoàn tất",
        cancelText: "Hủy bỏ"
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result)
        return;
      result['adminId'] = admin.getUserId();
      const newAdmin = User.fromJSON(result);
      this.userService.updateUser(newAdmin).then((result) => {
        this.initAdmins();
      }, (error) => {
        console.log(error);
      });
    });
  }

  onRemoveAdmin(admin: User): void {
    this.dialog
      .open(YesNoPopupComponent)
      .afterClosed()
      .subscribe(result => {
        if (!result) return;
        this.userService.removeUser(admin).then(
          () => {
            this.admins = this.admins.filter(value => {
              return value.getUserId() != admin.getUserId();
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
