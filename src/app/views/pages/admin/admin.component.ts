import { Component, OnInit, ViewChild } from "@angular/core";
import User, { UserRole } from "src/app/models/user";
import { UserService } from "src/app/controllers/user.service";
import { MatDialog } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminPageComponent implements OnInit {
  @ViewChild("table", { static: false }) table: MatTable<any>;
  public admins: User[] = [];
  public columnsToDisplay: string[] = ["username", "name", "phone", "email", "address"];

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit() {
    this.initAdmins();
    this.userService.currentUserUpdated.subscribe(() => {
      this.initAdmins();
    })
  }

  initAdmins(): void {
    this.userService.getAllUser(UserRole.ADMIN).then(
      result => {
        this.admins = result;
      },
      error => {
        console.log(error);
      }
    );
  }
}
