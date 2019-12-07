import { Component, OnInit } from '@angular/core';
import Category from 'src/app/models/category';
import { CategoryService } from 'src/app/controllers/category.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public categories: Category[];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getCategories().then((result) => {
      this.categories = result;
    }, (error) => {
      console.log(error);
    })
  }

}
