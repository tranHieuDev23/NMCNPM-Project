import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Category from '../models/category';
import { APIS } from '../configs/api-endpoints';

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  private categories: Category[] = null;

  constructor(private http: HttpClient) {}

  private initCategories(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http
        .post<any[]>(APIS.RETRIEVE_CATEGORIES_API, {})
        .toPromise()
        .then(
          result => {
            const deserialized: Category[] = [];
            result.forEach(element => {
              deserialized.push(Category.fromJSON(element));
            });
            this.categories = deserialized;
            resolve();
          },
          error => {
            reject(error);
          }
        );
    });
  }

  public getCategories(): Promise<Category[]> {
    return new Promise((resolve, reject) => {
      if (this.categories == null) {
        this.initCategories().then(() => {
          resolve(this.categories);
        }, reject);
      } else resolve(this.categories);
    });
  }

  public getCategory(categoryId: number): Promise<Category> {
    return new Promise((resolve, reject) => {
      this.http
        .post<any>(APIS.RETRIEVE_CATEGORY_API, { categoryId })
        .toPromise()
        .then(
          result => {
            const category = Category.fromJSON(result);
            if (category) {
              resolve(category);
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
