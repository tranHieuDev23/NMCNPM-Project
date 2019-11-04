import { Component, OnInit } from '@angular/core';
import { ProductRetrieverService } from 'src/app/controllers/product-retriever.service';
import Product from 'src/app/models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public products: Product[] = [];
  public selectedProduct: Product = null;

  constructor(
    private productService: ProductRetrieverService
  ) { }

  ngOnInit() {
    this.productService.getProducts().then(result => {
      this.products = result;
      this.selectedProduct = this.products[0];
    })
  }

  public setSelectedProduct(product: Product): void {
    this.selectedProduct = product;
  }
}
