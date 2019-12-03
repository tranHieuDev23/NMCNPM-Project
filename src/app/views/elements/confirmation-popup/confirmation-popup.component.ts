import { Component } from "@angular/core";
import { CartService } from "ng-shopping-cart";
import ProductCartItem from "src/app/models/cart-item";
import { MatDialogRef } from "@angular/material/dialog";
import Customer from "src/app/models/customer";
import Order from "src/app/models/order";
import { OrderService } from "src/app/controllers/order.service";

@Component({
  selector: "app-confirmation-popup",
  templateUrl: "./confirmation-popup.component.html",
  styleUrls: ["./confirmation-popup.component.scss"]
})
export class ConfirmationPopupComponent {
  public name: string = "";
  public email: string = "";
  public phone: string = "";
  public address: string = "";
  public cityRegion: string = "";

  public allCityRegion: string[] = [
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang	Hà Nam",
    "Hà Tĩnh",
    "Hải Dương",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Quảng Bình	Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
    "Phú Yên	Cần Thơ",
    "Đà Nẵng",
    "Hải Phòng",
    "Hà Nội",
    "TP HCM"
  ];

  constructor(
    private cartService: CartService<ProductCartItem>,
    private orderService: OrderService,
    private dialogRef: MatDialogRef<ConfirmationPopupComponent>
  ) {}

  onPurchasing(): void {
    const customer = new Customer(
      null,
      this.name,
      this.email,
      this.phone,
      this.address,
      this.cityRegion
    );
    const products = this.cartService.getItems();
    const order = new Order(customer, products);
    this.orderService.addOrder(order).then(
      result => {
        this.dialogRef.close(true);
      },
      error => {
        this.dialogRef.close(false);
      }
    );
  }
}
