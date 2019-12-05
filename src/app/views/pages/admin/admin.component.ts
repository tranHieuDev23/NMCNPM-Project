import { Component, OnInit, ViewChild } from "@angular/core";
import Admin from "src/app/models/admin";
import { UserService } from "src/app/controllers/user.service";
import { MatDialog } from '@angular/material/dialog';
import { AddUserPopupComponent } from '../../elements/add-user-popup/add-user-popup.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminPageComponent implements OnInit {
  @ViewChild('table', {static: false}) table: MatTable<any>;
  public admins: Admin[] = [];
  public columnsToDisplay: string[] = ['name', 'phone', 'email', 'edit'];

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
    const dialogRef = this.dialog.open(AddUserPopupComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.admins.push(result);
        this.table.renderRows();
      }
    });
  }
}
