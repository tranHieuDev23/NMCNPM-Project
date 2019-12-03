import { Component, OnInit } from "@angular/core";
import { ProductRetrieverService } from "src/app/controllers/product-retriever.service";
import Product from "src/app/models/product";
import Category from "src/app/models/category";
import { MatDialog } from "@angular/material/dialog";
import { OrderPopupComponent } from "../../elements/order-popup/order-popup.component";
import { ActivatedRoute, ParamMap, Params } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomePageComponent implements OnInit {
  public products: Product[] = [];
  public selectedProduct: Product = null;
  public selectedCategory: Category = null;

  constructor(
    private productService: ProductRetrieverService,
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
      this.productService.getProducts().then(
        result => {
          this.products = result;
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
}
