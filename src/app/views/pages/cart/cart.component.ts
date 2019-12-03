import { Component, OnInit } from "@angular/core";
import { CartService } from "ng-shopping-cart";
import ProductCartItem from "src/app/models/cart-item";
import Category from "src/app/models/category";
import { ProductRetrieverService } from "src/app/controllers/product-retriever.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationPopupComponent } from "../../elements/confirmation-popup/confirmation-popup.component";

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

  public categories: Category[] = [];
  public showButtons: boolean = false;

  constructor(
    private cartService: CartService<ProductCartItem>,
    private productService: ProductRetrieverService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.initialize();
    this.update();
    this.cartService.onItemsChanged.subscribe(() => {
      this.update();
    });
  }

  initialize() {
    this.productService.getCategories().then(
      result => {
        this.categories = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  update() {
    this.showButtons = this.cartService.getItems().length > 0;
  }

  onClearCart() {
    this.cartService.clear();
    this.router.navigateByUrl("/");
  }

  onConfirmPurchase() {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      width: "600px"
    });
    dialogRef.afterClosed().subscribe(success => {
      if (success) {
        this.cartService.clear();
        this.router.navigateByUrl("/");
      } else {
        console.log("Failure!");
      }
    });
  }
}
