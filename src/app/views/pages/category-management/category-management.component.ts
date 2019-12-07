import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/controllers/category.service";
import Category from "src/app/models/category";

@Component({
  selector: "app-category-management",
  templateUrl: "./category-management.component.html",
  styleUrls: ["./category-management.component.scss"]
})
export class CategoryManagementComponent implements OnInit {
  public categories: Category[] = [];
  public columnsToDisplay: string[] = ["name", "image", "edit"];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.initCategories();
    this.categoryService.onCategoriesChanged.subscribe(() => {
      this.initCategories();
    });
  }

  initCategories(): void {
    this.categoryService.getCategories().then(
      result => {
        this.categories = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  onCreateCategory(): void {
    
  }
}
