import { Component, OnInit } from '@angular/core';
import { CartService } from 'ng-shopping-cart';
import ProductCartItem from 'src/app/models/cart-item';
import { ProductService } from 'src/app/controllers/product.service';
import Category from 'src/app/models/category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public numberOfItems: number = 0;
  public categories: Category[] = [];

  constructor(
    private cartService: CartService<ProductCartItem>,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.initialize();
    this.update();
    this.cartService.onItemsChanged.subscribe(() => {
      this.update();
    });
  }

  initialize() {
    this.productService.getCategories().then((result) => {
      this.categories = result;
    }, (error) => {
      console.log(error);
    });
  }

  update() {
    this.numberOfItems = this.cartService.getItems().length;
  }
}
