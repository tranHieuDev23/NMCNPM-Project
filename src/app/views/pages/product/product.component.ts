import { Component, OnInit } from "@angular/core";
import Product from "src/app/models/product";
import { ProductRetrieverService } from "src/app/controllers/product-retriever.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import Category from 'src/app/models/category';

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  public categories: Category[];
  public product: Product;
  public images: String[];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductRetrieverService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.pageInit(params);
    });
  }

  pageInit(params: ParamMap): void {
    this.images = [];
    const productId = params.get("product-id");
    if (productId == null) {
      this.product = null;
      return;
    }
    
    this.productService.getCategories().then((result) => {
      this.categories = result;
    }, (error) => {
      this.categories = [];
    });

    this.productService.getProduct(+productId, true).then(
      result => {
        this.product = result;
        if (this.product.getDetail() != null) {
          if (this.product.getDetail().getImage1() != null)
            this.images.push(this.product.getDetail().getImage1());
          if (this.product.getDetail().getImage2() != null)
            this.images.push(this.product.getDetail().getImage2());
          if (this.product.getDetail().getImage3() != null)
            this.images.push(this.product.getDetail().getImage3());
          if (this.product.getDetail().getImage4() != null)
            this.images.push(this.product.getDetail().getImage4());
          if (this.product.getDetail().getImage5() != null)
            this.images.push(this.product.getDetail().getImage5());
        }
      },
      error => {
        this.product = null;
      }
    );
  }
}
