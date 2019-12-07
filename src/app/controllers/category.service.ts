import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Category from "../models/category";
import { APIS } from "../configs/api-endpoints";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  public onCategoriesChanged: EventEmitter<void> = new EventEmitter<void>();
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

  public addCategory(category: Category): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.post(APIS.ADD_CATEGORY_API, { category }).subscribe(() => {
        this.categories = null;
        this.onCategoriesChanged.emit();
        resolve();
      }, reject);
    });
  }

  public updateCategory(category: Category): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.post(APIS.UPDATE_CATEGORY_API, { category }).subscribe(() => {
        this.categories = null;
        this.onCategoriesChanged.emit();
        resolve();
      }, reject);
    });
  }

  public removeCategory(category: Category): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.post(APIS.REMOVE_CATEGORY_API, { category }).subscribe(() => {
        this.categories = null;
        this.onCategoriesChanged.emit();
        resolve();
      }, reject);
    });
  }
}
