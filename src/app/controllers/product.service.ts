import { Injectable, EventEmitter } from "@angular/core";
import Product from "../models/product";
import Category from "../models/category";
import { HttpClient } from "@angular/common/http";
import { APIS } from "../configs/api-endpoints";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  public onProductsUpdated: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: HttpClient, private userService: UserService) {}

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

  public addProduct(product: Product): Promise<void> {
    return new Promise((resolve, reject) => {
      const accessToken = this.userService.getAccessToken();
      if (!accessToken) {
        reject("No access token was found!");
        return;
      }
      this.http
        .post(APIS.ADD_PRODUCT_API, { accessToken, product })
        .subscribe(result => {
          this.onProductsUpdated.emit();
          resolve();
        }, reject);
    });
  }

  public updateProduct(product: Product): Promise<void> {
    return new Promise((resolve, reject) => {
      const accessToken = this.userService.getAccessToken();
      if (!accessToken) {
        reject("No access token was found!");
        return;
      }
      this.http
        .post(APIS.UPDATE_PRODUCT_API, { accessToken, product })
        .subscribe(() => {
          this.onProductsUpdated.emit();
          resolve();
        }, reject);
    });
  }

  public removeProduct(product: Product): Promise<void> {
    return new Promise((resolve, reject) => {
      const accessToken = this.userService.getAccessToken();
      if (!accessToken) {
        reject("No access token was found!");
        return;
      }
      this.http
        .post(APIS.REMOVE_PRODUCT_API, { accessToken, product })
        .subscribe(() => {
          this.onProductsUpdated.emit();
          resolve();
        }, reject);
    });
  }
}
