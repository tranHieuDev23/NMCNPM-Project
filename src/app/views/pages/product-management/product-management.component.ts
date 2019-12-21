import { Component, OnInit, ViewChild } from "@angular/core";
import Product from "src/app/models/product";
import { ProductService } from "src/app/controllers/product.service";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import {
  FormDialogComponent,
  FormControlItem
} from "../../elements/form-dialog/form-dialog.component";
import { CategoryService } from "src/app/controllers/category.service";
import ProductDetail from "src/app/models/product-detail";
import { MatSnackBar } from "@angular/material/snack-bar";
import { YesNoPopupComponent } from "../../elements/yes-no-popup/yes-no-popup.component";
import Category from 'src/app/models/category';

@Component({
  selector: "app-product-management",
  templateUrl: "./product-management.component.html",
  styleUrls: ["./product-management.component.scss"]
})
export class ProductManagementPageComponent implements OnInit {
  public products: Product[] = [];
  public shownProducts: Product[] = [];
  public columnsToDisplay: string[] = [
    "name",
    "category",
    "price",
    "quantity",
    "description",
    "image",
    "lastUpdate",
    "edit"
  ];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initProducts();
    this.productService.onProductsUpdated.subscribe(() => {
      this.initProducts();
    });
  }

  initProducts(): void {
    this.productService.getAllProduct(true).then(
      result => {
        this.products = result;
        this.setShownProducts(0, this.paginator.pageSize);
      },
      error => {
        console.log(error);
      }
    );
  }

  setShownProducts(pageStartIndex: number, pageLength: number): void {
    const startIndex = this.paginator.pageSize * pageStartIndex;
    const endIndex = startIndex + pageLength;
    this.shownProducts = this.products.slice(startIndex, endIndex);
  }

  onPageChanged(event: PageEvent): void {
    this.setShownProducts(event.pageIndex, event.pageSize);
  }

  onAddProduct(): void {
    this.categoryService.getCategories().then(
      categories => {
        const categoryNames: string[] = [];
        categories.forEach((item, index) => {
          categoryNames[index] = item.getName();
        });
        const dialogRef = this.dialog.open(FormDialogComponent, {
          width: "600px",
          data: {
            title: "Nhập thông tin để bổ sung sản phẩm mới",
            items: [
              new FormControlItem({
                placeholder: "Tên sản phẩm",
                name: "name"
              }),
              new FormControlItem({
                placeholder: "Loại sản phẩm",
                name: "category",
                controlType: "select",
                options: categories,
                optionTexts: categoryNames
              }),
              new FormControlItem({
                placeholder: "Giá",
                name: "price"
              }),
              new FormControlItem({
                placeholder: "Mô tả ngắn gọn",
                name: "description"
              }),
              new FormControlItem({
                placeholder: "Ảnh sản phẩm",
                name: "image"
              }),
              new FormControlItem({
                placeholder: "Thông tin cụ thể về sản phẩm",
                name: "information",
                controlType: "rich"
              }),
              new FormControlItem({
                placeholder: "Thông tin phụ kiện",
                name: "accessories",
                controlType: "rich"
              }),
              new FormControlItem({
                placeholder: "Thông tin bảo hành",
                name: "guaranty",
                controlType: "rich"
              }),
              new FormControlItem({
                placeholder: "Ảnh slideshow thứ nhất",
                name: "image1"
              }),
              new FormControlItem({
                placeholder: "Ảnh slideshow thứ hai",
                name: "image2"
              }),
              new FormControlItem({
                placeholder: "Ảnh slideshow thứ ba",
                name: "image3"
              }),
              new FormControlItem({
                placeholder: "Ảnh slideshow thứ tư",
                name: "image4"
              }),
              new FormControlItem({
                placeholder: "Ảnh slideshow thứ năm",
                name: "image5"
              })
            ],
            completedText: "Thêm sản phẩm",
            cancelText: "Hủy bỏ"
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (!result) return;
          result.thumbImage = result.image;
          result.lastUpdate = new Date();
          result.detail = ProductDetail.fromJSON(result);
          const newProduct: Product = Product.fromJSON(result);
          this.productService.addProduct(newProduct).then(
            () => {
              this.snackbar.open("Thêm sản phẩm mới thành công!", null, {
                duration: 3000
              });
            },
            error => {
              console.log(error);
            }
          );
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  onUpdateProduct(product: Product): void {
    this.categoryService.getCategories().then(
      categories => {
        const categoryNames: string[] = [];
        categories.forEach((item, index) => {
          categoryNames[index] = item.getName();
        });
        const dialogRef = this.dialog.open(FormDialogComponent, {
          width: "600px",
          data: {
            title: `Cập nhật thông tin của sản phẩm ${product.getName()}`,
            items: [
              new FormControlItem({
                placeholder: "Tên sản phẩm",
                name: "name",
                value: product.getName()
              }),
              new FormControlItem({
                placeholder: "Loại sản phẩm",
                name: "category",
                controlType: "select",
                options: categories,
                optionTexts: categoryNames,
                value: product.getCategory(),
                compareWith: (o1: Category, o2: Category) => {
                  return o1.getCategoryId() == o2.getCategoryId();
                }
              }),
              new FormControlItem({
                placeholder: "Giá",
                name: "price",
                value: product.getPrice()
              }),
              new FormControlItem({
                placeholder: "Mô tả ngắn gọn",
                name: "description",
                value: product.getDescription()
              }),
              new FormControlItem({
                placeholder: "Ảnh sản phẩm",
                name: "image",
                value: product.getImage()
              }),
              new FormControlItem({
                placeholder: "Thông tin cụ thể về sản phẩm",
                name: "information",
                controlType: "rich",
                value: product.getDetail().getInformation()
              }),
              new FormControlItem({
                placeholder: "Thông tin phụ kiện",
                name: "accessories",
                controlType: "rich",
                value: product.getDetail().getAccessories()
              }),
              new FormControlItem({
                placeholder: "Thông tin bảo hành",
                name: "guaranty",
                controlType: "rich",
                value: product.getDetail().getGuaranty()
              }),
              new FormControlItem({
                placeholder: "Ảnh slideshow thứ nhất",
                name: "image1",
                value: product.getDetail().getImage1()
              }),
              new FormControlItem({
                placeholder: "Ảnh slideshow thứ hai",
                name: "image2",
                value: product.getDetail().getImage2()
              }),
              new FormControlItem({
                placeholder: "Ảnh slideshow thứ ba",
                name: "image3",
                value: product.getDetail().getImage3()
              }),
              new FormControlItem({
                placeholder: "Ảnh slideshow thứ tư",
                name: "image4",
                value: product.getDetail().getImage4()
              }),
              new FormControlItem({
                placeholder: "Ảnh slideshow thứ năm",
                name: "image5",
                value: product.getDetail().getImage5()
              })
            ],
            completedText: "Hoàn tất",
            cancelText: "Hủy bỏ"
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (!result) return;
          result.productId = product.getProductId();
          result.thumbImage = result.image;
          result.lastUpdate = new Date();
          result.detail = ProductDetail.fromJSON(result);
          const newProduct: Product = Product.fromJSON(result);
          this.productService.updateProduct(newProduct).then(
            () => {
              this.snackbar.open(
                "Cập nhật thông tin sản phẩm thành công!",
                null,
                {
                  duration: 3000
                }
              );
            },
            error => {
              console.log(error);
            }
          );
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  onRemoveProduct(product: Product): void {
    this.dialog
      .open(YesNoPopupComponent)
      .afterClosed()
      .subscribe(result => {
        if (!result) return;
        this.productService.removeProduct(product).then(
          () => {
            this.snackbar.open("Đã xóa sản phẩm!", null, { duration: 3000 });
          },
          error => {
            console.log(error);
          }
        );
      });
  }
}
