import { Injectable } from '@angular/core';
import Product from '../models/product';
import Category from '../models/category';
import ProductDetail from '../models/product-detail';

const DETAIL: ProductDetail = new ProductDetail(
  1,
  "This is how a normal product detail would look like",
  "https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
  "https://www.w3schools.com/w3css/img_lights.jpg",
  "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
  "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
  "Sản phẩm này không đi kèm phu kiện",
  "Bảo hành của sản phẩm này cũng như"
);

const CATEGORIES: Category[] = [
  new Category(1, "Laptop", "https://www.mageplaza.com/assets/img/extensions/product-labels.png"),
  new Category(2, "Smartphone", "https://www.mageplaza.com/assets/img/extensions/product-labels.png"),
  new Category(3, "Accessory", "https://www.mageplaza.com/assets/img/extensions/product-labels.png")
];

const PRODUCTS: Product[] = [
  new Product(1, "USB", 200, "An USB", "A very cool USB", 
    "https://www.mageplaza.com/assets/img/extensions/product-labels.png",
    "https://www.mageplaza.com/assets/img/extensions/product-labels.png",
    null, CATEGORIES[2], DETAIL),
  new Product(2, "Macbook", 20000, "Macbook from Apple", "A very expensive product", 
    "https://www.mageplaza.com/assets/img/extensions/product-labels.png",
    "https://www.mageplaza.com/assets/img/extensions/product-labels.png",
    null, CATEGORIES[0], DETAIL),
  new Product(3, "Dell Laptop", 10000, "Laptop from Dell", "A less expensive product", 
    "https://www.mageplaza.com/assets/img/extensions/product-labels.png",
    "https://www.mageplaza.com/assets/img/extensions/product-labels.png",
    null, CATEGORIES[0], DETAIL),
  new Product(4, "Smartphone", 500, "Unspecified smartphone", "Probably manufactured from Vietnam", 
    "https://www.mageplaza.com/assets/img/extensions/product-labels.png",
    "https://www.mageplaza.com/assets/img/extensions/product-labels.png",
    null, CATEGORIES[1], DETAIL),
  new Product(5, "SD Card", 20, "Store information in a small size", "Usually found in camera", 
    "https://www.mageplaza.com/assets/img/extensions/product-labels.png",
    "https://www.mageplaza.com/assets/img/extensions/product-labels.png",
    null, CATEGORIES[2], DETAIL),
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

  public getProduct(productId: number, withDetail: boolean = false): Promise<Product> {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < PRODUCTS.length; i ++) {
        if (PRODUCTS[i].getProductId() == productId) {
          resolve(PRODUCTS[i]);
          return;
        }
      }
      reject("No product with the productId provided was found.");
    });
  }
}
