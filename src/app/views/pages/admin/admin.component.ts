import { Component, OnInit } from "@angular/core";
import Admin from "src/app/models/admin";
import { UserService } from "src/app/controllers/user.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminPageComponent implements OnInit {
  public admins: Admin[] = [];
  public columnsToDisplay: string[] = ['name', 'phone', 'email', 'edit'];

  constructor(private userService: UserService) {}

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
}
