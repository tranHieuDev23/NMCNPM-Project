import { Component, OnInit } from '@angular/core';
import { CartService } from 'ng-shopping-cart';
import ProductCartItem from 'src/app/models/cart-item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public numberOfItems: number = 0;

  constructor(
    private cartService: CartService<ProductCartItem>
  ) { }

  ngOnInit() {
    this.initialize();
    this.cartService.onItemsChanged.subscribe(() => {
      this.initialize();
    });
  }

  initialize() {
    this.numberOfItems = this.cartService.getItems().length;
  }

}
