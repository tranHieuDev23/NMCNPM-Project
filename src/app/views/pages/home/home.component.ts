import { Component, OnInit } from '@angular/core';
import { ProductRetrieverService } from 'src/app/controllers/product-retriever.service';
import Product from 'src/app/models/product';
import Category from 'src/app/models/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public products: Product[] = [];
  public categories: Category[] = [];
  public selectedProduct: Product = null;
  public selectedCategory: Category = null;

  constructor(
    private productService: ProductRetrieverService
  ) { }

  ngOnInit() {
    this.productService.getCategories().then(result => {
      this.categories = result;
    });
    this.loadAllProduct();
  }

  public loadAllProduct(): void {
    this.productService.getProducts().then(result => {
      this.products = result;
      this.selectedProduct = this.products[0];
    });
  }

  public setSelectedProduct(product: Product): void {
    this.selectedProduct = product;
  }

  public setSelectedCategory(category: Category): void {
    this.selectedCategory = category;
    this.productService.getProductsOfCategory(this.selectedCategory).then(result => {
      this.products = result;
      this.selectedProduct = this.products[0];
    });
  }
}
