import { Component, OnInit, ViewChild } from "@angular/core";
import { ProductService } from "src/app/controllers/product.service";
import Product from "src/app/models/product";
import Category from "src/app/models/category";
import { MatDialog } from "@angular/material/dialog";
import { OrderPopupComponent } from "../../elements/order-popup/order-popup.component";
import { ActivatedRoute, ParamMap, Params } from "@angular/router";
import { PageEvent, MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomePageComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public products: Product[] = [];
  public shownProducts: Product[] = [];
  public selectedProduct: Product = null;
  public selectedCategory: Category = null;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.initialize(params);
    });
  }

  public initialize(params: ParamMap): void {
    const categoryId = params.get("category-id");
    if (categoryId == null) {
      this.productService.getAllProduct().then(
        result => {
          this.products = result;
          this.setShownProducts(0, this.paginator.pageSize);
          this.selectedProduct =
            this.products.length > 0 ? this.products[0] : null;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.productService.getCategory(+categoryId).then(
        result => {
          this.selectedCategory = result;
          this.productService.getProductsOfCategory(this.selectedCategory).then(
            results => {
              this.products = results;
              this.setShownProducts(0, this.paginator.pageSize);
              this.selectedProduct =
                this.products.length > 0 ? this.products[0] : null;
            },
            error => {
              console.log(error);
            }
          );
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  setShownProducts(pageStartIndex: number, pageLength: number): void {
    const startIndex = this.paginator.pageSize * pageStartIndex;
    const endIndex = startIndex + pageLength;
    this.shownProducts = this.products.slice(startIndex, endIndex);
  }

  public setSelectedProduct(product: Product): void {
    this.selectedProduct = product;
  }

  openDialog(): void {
    this.dialog.open(OrderPopupComponent, {
      data: {
        product: this.selectedProduct
      }
    });
  }

  onPageChanged(event: PageEvent): void {
    this.setShownProducts(event.pageIndex, event.pageSize);
  }
}
