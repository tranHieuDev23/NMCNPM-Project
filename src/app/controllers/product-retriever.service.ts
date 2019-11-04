import { Injectable } from '@angular/core';
import Product from '../models/product';
import Category from '../models/category';

const CATEGORIES: Category[] = [
  new Category(1, "Laptop", "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-laptops-deals-1571415357.jpg?crop=0.668xw:1.00xh;0.167xw,0&resize=640:*"),
  new Category(2, "Smartphone", "http://genknews.genkcdn.vn/2017/1-1505725913164.jpg"),
  new Category(3, "Accessory", "https://www.dillerimage.com/wp-content/uploads/2019/03/Digital-Accessories-1.jpg")
];

const PRODUCTS: Product[] = [
  new Product(1, "USB", 200, "An USB", "A very cool USB", 
    "https://www.incredible.co.za/media/catalog/product/cache/3/image/1400x/0dc2d03fe217f8c83829496872af24a0/7/a/7a1dbf99333236de73eea8bceb73a8a0_1.jpg", 
    "https://www.incredible.co.za/media/catalog/product/cache/3/image/1400x/0dc2d03fe217f8c83829496872af24a0/7/a/7a1dbf99333236de73eea8bceb73a8a0_1.jpg", 
    null, CATEGORIES[2], null),
  new Product(2, "Macbook", 20000, "Macbook from Apple", "A very expensive product", 
    "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp13touch-space-select-201807?wid=892&hei=820&&qlt=80&.v=1529520060550", 
    "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp13touch-space-select-201807?wid=892&hei=820&&qlt=80&.v=1529520060550", 
    null, CATEGORIES[0], null),
  new Product(3, "Dell Laptop", 10000, "Laptop from Dell", "A less expensive product", 
    "http://ngocminhlong.com/images/detailed/5/notebook-latitude-14-5400-campaign-hero-504x350-ng.jpg", 
    "http://ngocminhlong.com/images/detailed/5/notebook-latitude-14-5400-campaign-hero-504x350-ng.jpg", 
    null, CATEGORIES[0], null),
  new Product(4, "Smartphone", 500, "Unspecified smartphone", "Probably manufactured from Vietnam", 
    "https://icdn.dantri.com.vn/thumb_w/640/2019/08/06/vsmart-live-1565055954929.png", 
    "https://icdn.dantri.com.vn/thumb_w/640/2019/08/06/vsmart-live-1565055954929.png", 
    null, CATEGORIES[1], null),
  new Product(5, "SD Card", 20, "Store information in a small size", "Usually found in camera", 
    "https://bulkmemorycards.com/wp-content/uploads/2017/12/8GB-SD-Sandisk-Memory-Card.jpg", 
    "https://bulkmemorycards.com/wp-content/uploads/2017/12/8GB-SD-Sandisk-Memory-Card.jpg", 
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
