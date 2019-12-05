import { Component, OnInit, ViewChild } from "@angular/core";
import Product from "src/app/models/product";
import { ProductService } from "src/app/controllers/product.service";
import { MatPaginator, PageEvent } from "@angular/material/paginator";

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
    "description",
    "image",
    "lastUpdate",
    "edit"
  ];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProduct().then(
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
}
