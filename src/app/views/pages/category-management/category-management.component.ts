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
          new FormControlItem({placeholder: "Tên", name: "name"}),
          new FormControlItem({placeholder: "Ảnh đại diện", name: "image"})
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
      this.categoryService.addCategory(newCategory).then(
        () => {},
        error => {
          console.log(error);
        }
      );
    });
  }

  onUpdateCategory(category: Category): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: "600px",
      data: {
        title: `Cập nhật thông tin của loại sản phẩm ${category.getName()}`,
        items: [
          new FormControlItem({placeholder: "Tên", name: "name", value: category.getName()}),
          new FormControlItem({placeholder: "Ảnh đại diện", name: "image", value: category.getImage()})
        ],
        completedText: "Hoàn tất",
        cancelText: "Hủy bỏ"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      result.categoryId = category.getCategoryId();
      result.name = result.name.trim();
      result.image = result.image.trim();
      const newCategory = Category.fromJSON(result);
      if (!newCategory) return;
      this.categoryService.updateCategory(newCategory).then(
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
