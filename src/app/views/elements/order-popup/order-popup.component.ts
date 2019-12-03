import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Product from 'src/app/models/product';
import { CartService } from 'ng-shopping-cart';
import ProductCartItem from 'src/app/models/cart-item';

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
    @Inject(MAT_DIALOG_DATA) public data: any
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
    console.log(this.quantity);
    if (this.quantity == 0) {
      this.cartService.removeItem(this.product.getProductId());
    } else {
      this.cartService.addItem(ProductCartItem.fromProduct(this.product, this.quantity));
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
