import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Product from 'src/app/models/product';
import { CartService } from 'ng-shopping-cart';
import ProductCartItem from 'src/app/models/cart-item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-popup',
  templateUrl: './order-popup.component.html',
  styleUrls: ['./order-popup.component.scss']
})
export class OrderPopupComponent {
  public product: Product;
  public quantity: number;

  constructor(
    private cartService: CartService<ProductCartItem>,
    private dialogRef: MatDialogRef<OrderPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.product = data.product;
    if (this.product != null) {
      const item: ProductCartItem = this.cartService.getItem(this.product.getProductId());
      if (item != null)
        this.quantity = item.getQuantity();
      else
        this.quantity = 0;
    } else {
      this.quantity = 0;
    }
  }

  onOrder(): void {
    if (this.quantity == 0) {
      this.cartService.removeItem(this.product.getProductId());
    } else {
      this.cartService.addItem(ProductCartItem.fromProduct(this.product, this.quantity));
      this.snackbar.open("Giỏ hàng đã được cập nhật!", "Xem giỏ hàng").onAction().subscribe(() => {
        this.router.navigateByUrl("/cart")
      });
    }
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  changeQuantity(value: number): void {
    this.quantity += value;
    if (this.quantity < 0)
      this.quantity = 0;
  }
}
