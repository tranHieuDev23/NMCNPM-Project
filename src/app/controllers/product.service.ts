import { Injectable } from "@angular/core";
import Product from "../models/product";
import Category from "../models/category";
import { HttpClient } from "@angular/common/http";
import { APIS } from "../configs/api-endpoints";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public getAllProduct(withDetail: boolean = false): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      this.http
        .post<any[]>(APIS.RETRIEVE_PRODUCTS_API, { withDetail })
        .toPromise()
        .then(
          result => {
            const products: Product[] = [];
            result.forEach(element => {
              products.push(Product.fromJSON(element));
            });
            resolve(products);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  public getProductsOfCategory(
    category: Category,
    withDetail: boolean = false
  ): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      this.http
        .post<any[]>(APIS.RETRIEVE_PRODUCTS_API, { withDetail, category })
        .toPromise()
        .then(
          result => {
            const products: Product[] = [];
            result.forEach(element => {
              products.push(Product.fromJSON(element));
            });
            resolve(products);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  public getProduct(
    productId: number,
    withDetail: boolean = false
  ): Promise<Product> {
    return new Promise((resolve, reject) => {
      this.http
        .post<any[]>(APIS.RETRIEVE_PRODUCT_API, { productId, withDetail })
        .toPromise()
        .then(
          result => {
            const product = Product.fromJSON(result);
            if (product) {
              resolve(product);
            } else {
              reject("Error while deserialize response!");
            }
          },
          error => {
            reject(error);
          }
        );
    });
  }
}
