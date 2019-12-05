import { Component, OnInit } from '@angular/core';
import { CartService } from 'ng-shopping-cart';
import ProductCartItem from 'src/app/models/cart-item';
import { ProductService } from 'src/app/controllers/product.service';
import Category from 'src/app/models/category';
import { UserService } from 'src/app/controllers/user.service';
import Admin from 'src/app/models/admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public numberOfItems: number = 0;
  public categories: Category[] = [];
  public admin: Admin = null;

  constructor(
    private cartService: CartService<ProductCartItem>,
    private productService: ProductService,
    private userService: UserService,
    private router: Router
  ) {
    this.userService.currentUser.subscribe((result) => {
      this.admin = result;
    });
  }

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

  onLogout(): void {
    this.userService.logout().then(() => {
      this.router.navigateByUrl('/');
    }, (error) => {
      console.log(error);
    });
  }
}
