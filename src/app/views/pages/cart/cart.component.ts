import { Component, OnInit } from "@angular/core";
import { CartService } from "ng-shopping-cart";
import ProductCartItem from "src/app/models/cart-item";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import {
  FormControlItem,
  FormDialogComponent
} from "../../elements/form-dialog/form-dialog.component";
import { ALL_CITY_REGIONS } from "../../../configs/regions";
import { OrderService } from "src/app/controllers/order.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartPageComponent implements OnInit {
  public headers = {
    empty: "Rỗng",
    name: "Tên sản phẩm",
    quantity: "Số lượng",
    price: "Đơn giá",
    total: "Tổng cộng"
  };

  public footers = {
    tax: "Thuế",
    shipping: "Tiền vận chuyển",
    total: "Thành tiền"
  };

  public showButtons: boolean = false;

  constructor(
    private cartService: CartService<ProductCartItem>,
    private orderService: OrderService,
    private dialog: MatDialog,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.update();
    this.cartService.onItemsChanged.subscribe(() => {
      this.update();
    });
  }

  update() {
    this.showButtons = this.cartService.getItems().length > 0;
  }

  onClearCart() {
    this.cartService.clear();
    this.router.navigateByUrl("/");
  }

  onConfirmPurchase() {
    this.router.navigateByUrl("/purchase");
  }
}
