import { Component, OnInit, ViewChild } from "@angular/core";
import { CartService } from "ng-shopping-cart";
import ProductCartItem from "src/app/models/cart-item";
import User from "src/app/models/user";
import { UserService } from "src/app/controllers/user.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
  ValidatorFn
} from "@angular/forms";
import { MatStepper } from "@angular/material/stepper";
import { StepperSelectionEvent } from "@angular/cdk/stepper";

const PHONE_REGEX = /\b(0[3|5|7|8|9])+([0-9]{8})\b/;

@Component({
  selector: "app-purchase-page",
  templateUrl: "./purchase-page.component.html",
  styleUrls: ["./purchase-page.component.scss"]
})
export class PurchasePageComponent implements OnInit {
  @ViewChild("stepper", { static: true }) stepper: MatStepper;
  public user: User;
  public billingInfoForm: FormGroup;

  public items: ProductCartItem[] = [];
  public totalCost: number = 0;
  public displayedColumns: string[] = ["name", "price", "quantity", "sum"];

  constructor(
    private userService: UserService,
    private cartSerivce: CartService<ProductCartItem>,
    private router: Router,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.billingInfoForm = this.formBuilder.group({
      nameFormControl: ["", Validators.required],
      emailFormControl: ["", Validators.email],
      phoneFormControl: ["", Validators.pattern(PHONE_REGEX)],
      addressFormControl: ["", Validators.required]
    });
    this.billingInfoForm.setValidators(this.getBillingFormValidator());
  }

  getBillingFormValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const emailFormControl = group.controls.emailFormControl;
      const phoneFormControl = group.controls.phoneFormControl;
      if (!emailFormControl || !phoneFormControl) {
        emailFormControl.setErrors({ emailAndPhoneEmpty: true });
        phoneFormControl.setErrors({ emailAndPhoneEmpty: true });
        return;
      }
      if (
        emailFormControl.value != null &&
        emailFormControl.value != undefined &&
        emailFormControl.value != ""
      ) {
        return;
      }
      if (
        phoneFormControl.value != null &&
        phoneFormControl.value != undefined &&
        phoneFormControl.value != ""
      ) {
        return;
      }
      emailFormControl.setErrors({ emailAndPhoneEmpty: true });
      phoneFormControl.setErrors({ emailAndPhoneEmpty: true });
      return;
    };
  }

  initialize(): void {
    this.userService.getLoggedInUser().then(
      result => {
        this.user = result;
        this.initalizeBillingForm();
        this.items = this.cartSerivce.getItems();
        this.totalCost = this.cartSerivce.cost();
      },
      error => {
        console.log(error);
        this.snackbar.open(
          "Có vấn đề trong quá trình xác thực thông tin đăng nhập!",
          null,
          { duration: 3000 }
        );
        this.router.navigateByUrl("/");
      }
    );
  }

  initalizeBillingForm(): void {
    this.billingInfoForm.controls.nameFormControl.setValue(this.user.getName());
    this.billingInfoForm.controls.emailFormControl.setValue(
      this.user.getEmail()
    );
    this.billingInfoForm.controls.phoneFormControl.setValue(
      this.user.getPhone()
    );
    this.billingInfoForm.controls.addressFormControl.setValue(
      this.user.getAddress()
    );
  }

  ngOnInit(): void {
    console.log(this.stepper);
    this.initialize();
    this.stepper.selectionChange.subscribe((value: StepperSelectionEvent) => {
      if (value.previouslySelectedIndex == 0) {
        this.onSubmitBillingForm();
      }
    });
  }

  isBillingFormChanged(): boolean {
    if (
      this.user.getName() !==
      this.billingInfoForm.controls.nameFormControl.value
    )
      return true;
    if (
      this.user.getEmail() !==
      this.billingInfoForm.controls.emailFormControl.value
    )
      return true;
    if (
      this.user.getPhone() !==
      this.billingInfoForm.controls.phoneFormControl.value
    )
      return true;
    if (
      this.user.getAddress() !==
      this.billingInfoForm.controls.addressFormControl.value
    )
      return true;
    return false;
  }

  onSubmitBillingForm(): void {
    if (this.billingInfoForm.invalid) return;
    if (!this.isBillingFormChanged()) return;
    this.user = new User(
      this.user.getUserId(),
      this.user.getUsername(),
      this.billingInfoForm.controls.nameFormControl.value.trim(),
      this.billingInfoForm.controls.emailFormControl.value.trim(),
      this.billingInfoForm.controls.phoneFormControl.value.trim(),
      this.billingInfoForm.controls.addressFormControl.value.trim(),
      this.user.getCityRegion(),
      this.user.getRole()
    );
  }
}
