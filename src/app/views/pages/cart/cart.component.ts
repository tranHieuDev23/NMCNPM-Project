import { Component, OnInit } from '@angular/core';
import { CartService } from 'ng-shopping-cart';
import ProductCartItem from 'src/app/models/cart-item';
import Category from 'src/app/models/category';
import { ProductRetrieverService } from 'src/app/controllers/product-retriever.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
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
    private productService: ProductRetrieverService 
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
    })
  }

  update() {
    this.showButtons = (this.cartService.getItems().length > 0);
  }
}
