import { Component, OnInit } from "@angular/core";
import { CartService } from "ng-shopping-cart";
import ProductCartItem from "src/app/models/cart-item";
import Category from "src/app/models/category";
import { UserService } from "src/app/controllers/user.service";
import User from "src/app/models/user";
import { Router } from "@angular/router";
import { CategoryService } from "src/app/controllers/category.service";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EditProfileDialogComponent } from "../edit-profile-dialog/edit-profile-dialog.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  public numberOfItems: number = 0;
  public categories: Category[] = [];
  public user: User = null;

  constructor(
    private cartService: CartService<ProductCartItem>,
    private categoryService: CategoryService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
    this.userService.currentUserChanged.subscribe(result => {
      this.user = result;
    });
  }

  ngOnInit() {
    this.initCategories();
    this.initItemsCount();
    this.categoryService.onCategoriesChanged.subscribe(() => {
      this.initCategories();
    });
    this.cartService.onItemsChanged.subscribe(() => {
      this.initItemsCount();
    });
  }

  initCategories() {
    this.categoryService.getCategories().then(
      result => {
        this.categories = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  initItemsCount() {
    this.numberOfItems = this.cartService.getItems().length;
  }

  onLogout(): void {
    this.userService.logout().then(
      () => {
        this.router.navigateByUrl("/");
      },
      error => {
        console.log(error);
      }
    );
  }

  onEditProfile(): void {
    if (!this.user) return;
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: "600px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbar.open("Cập nhật thông tin thành công!", null, {
          duration: 3000
        });
      } else {
        this.snackbar.open("Cập nhật thông tin không thành công!", null, {
          duration: 3000
        });
      }
    });
  }
}
