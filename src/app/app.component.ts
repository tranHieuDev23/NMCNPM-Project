import { Component } from '@angular/core';
import { CartService } from 'ng-shopping-cart';
import ProductCartItem from './models/cart-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private cartService: CartService<ProductCartItem>
  ) {
    this.cartService.setLocaleFormat("VND");
  }
}
