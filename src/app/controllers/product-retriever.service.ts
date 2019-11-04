import { Injectable } from '@angular/core';
import Product from '../models/product';
import Category from '../models/category';

const CATEGORIES: Category[] = [
  new Category(1, "Laptop", ""),
  new Category(2, "Smartphone", ""),
  new Category(3, "Accessory", "")
];

const PRODUCTS: Product[] = [
  new Product(1, "USB", 200, "An USB", "A very cool USB", 
    "",
    "",
    null, CATEGORIES[2], null),
  new Product(2, "Macbook", 20000, "Macbook from Apple", "A very expensive product", 
    "",
    "",
    null, CATEGORIES[0], null),
  new Product(3, "Dell Laptop", 10000, "Laptop from Dell", "A less expensive product", 
    "",
    "",
    null, CATEGORIES[0], null),
  new Product(4, "Smartphone", 500, "Unspecified smartphone", "Probably manufactured from Vietnam", 
    "",
    "",
    null, CATEGORIES[1], null),
  new Product(5, "SD Card", 20, "Store information in a small size", "Usually found in camera", 
    "",
    "",
    null, CATEGORIES[2], null),
];

@Injectable({
  providedIn: 'root'
})
export class ProductRetrieverService {
  public getCategories(): Promise<Category[]> {
    return new Promise((resolve, reject) => {
      resolve(CATEGORIES);
    });
  }

  public getProducts(withDetail: boolean = false): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      resolve(PRODUCTS);
    });
  }

  public getProductsOfCategory(category: Category, withDetail: boolean = false): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      const result: Product[] = [];
      PRODUCTS.forEach(element => {
        if (element.getCategory().getCategoryId() == category.getCategoryId())
          result.push(element);
      });
      resolve(result);
    });
  }
}
