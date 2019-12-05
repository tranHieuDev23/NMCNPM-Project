import { Component, OnInit } from '@angular/core';
import Admin from 'src/app/models/admin';
import { AuthenticationService } from 'src/app/controllers/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminPageComponent implements OnInit {
  public admins: Admin[] = [];

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

}
