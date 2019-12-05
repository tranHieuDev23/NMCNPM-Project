import { Component, OnInit } from '@angular/core';
import Category from 'src/app/models/category';
import { ProductService } from 'src/app/controllers/product.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public categories: Category[];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getCategories().then((result) => {
      this.categories = result;
    }, (error) => {
      console.log(error);
    })
  }

}
