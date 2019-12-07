import { Component, OnInit } from "@angular/core";
import { CartService } from "ng-shopping-cart";
import ProductCartItem from "src/app/models/cart-item";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import {
  FormControlItem,
  FormDialogComponent
} from "../../elements/form-dialog/form-dialog.component";
import { ALL_CITY_REGIONS } from "./regions";
import { OrderService } from "src/app/controllers/order.service";
import Order from "src/app/models/order";
import Customer from "src/app/models/customer";
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
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: "600px",
      data: {
        title: "Điền thông tin để hoàn tất đơn hàng",
        items: [
          new FormControlItem("input", "Tên", "text", "name"),
          new FormControlItem("input", "Email", "email", "email"),
          new FormControlItem("input", "Số điện thoại", "phone", "phone"),
          new FormControlItem("input", "Địa chỉ", "text", "address"),
          new FormControlItem(
            "select",
            "Tỉnh thành",
            "",
            "region",
            ALL_CITY_REGIONS
          )
        ],
        completedText: "Mua hàng",
        cancelText: "Hủy"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService
          .addOrder(
            new Order(
              new Customer(
                null,
                result.name,
                result.email,
                result.phone,
                result.address,
                result.region
              ),
              this.cartService.getItems()
            )
          )
          .then(
            () => {
              this.cartService.clear();
              this.router.navigateByUrl("/");
              this.snackbar.open(
                "Đơn hàng đã được tạo thành công! Chúng tôi sẽ sớm liên lạc lại với bạn",
                null,
                {
                  duration: 3000
                }
              );
            },
            error => {
              console.log(error);
              this.snackbar.open(
                "Có lỗi xảy ra trong quá trình tạo đơn hàng!",
                null,
                {
                  duration: 3000
                }
              );
            }
          );
      }
    });
  }
}
