import { Component, OnInit, ViewChild } from "@angular/core";
import { CategoryService } from "src/app/controllers/category.service";
import Category from "src/app/models/category";
import { MatDialog } from "@angular/material/dialog";
import {
  FormDialogComponent,
  FormControlItem
} from "../../elements/form-dialog/form-dialog.component";
import { MatTable } from "@angular/material/table";
import { YesNoPopupComponent } from "../../elements/yes-no-popup/yes-no-popup.component";

@Component({
  selector: "app-category-management",
  templateUrl: "./category-management.component.html",
  styleUrls: ["./category-management.component.scss"]
})
export class CategoryManagementComponent implements OnInit {
  @ViewChild("table", { static: false }) table: MatTable<any>;
  public categories: Category[] = [];
  public columnsToDisplay: string[] = ["name", "image", "edit"];

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

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
        this.table.renderRows();
      },
      error => {
        console.log(error);
      }
    );
  }

  onCreateCategory(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: "600px",
      data: {
        title: "Điền thông tin để tạo loại sản phẩm mới",
        items: [
          new FormControlItem("input", "Tên", "text", "name"),
          new FormControlItem("input", "Ảnh đại diện", "text", "image")
        ],
        completedText: "Hoàn tất",
        cancelText: "Hủy bỏ"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      result.name = result.name.trim();
      result.image = result.image.trim();
      const newCategory = Category.fromJSON(result);
      if (!newCategory) return;
      this.categoryService.addCategory(Category.fromJSON(result)).then(
        () => {},
        error => {
          console.log(error);
        }
      );
    });
  }

  onRemoveCategory(category: Category): void {
    this.dialog
      .open(YesNoPopupComponent)
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.categoryService.removeCategory(category).then(
            () => {},
            error => {
              console.log(error);
            }
          );
        }
      });
  }
}
