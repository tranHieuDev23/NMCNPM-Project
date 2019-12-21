import { Component, OnInit } from '@angular/core';
import { ALL_CITY_REGIONS } from "../../../configs/regions";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupPageComponent implements OnInit {
  public name: string = "";
  public userName: string = "";
  public password: string = "";
  public retypedPassword: string = "";
  public email: string = "";
  public phone: string = "";
  public address: string = "";
  public cityRegion: string = "";

  public allRegions: string[] = ALL_CITY_REGIONS;

  constructor() { }

  ngOnInit() {
  }
}
