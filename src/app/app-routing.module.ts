import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./views/pages/home/home.component";
import { ProductPageComponent } from "./views/pages/product/product.component";
import { CartPageComponent } from "./views/pages/cart/cart.component";
import { LoginPageComponent } from "./views/pages/login/login.component";
import { AdminPageComponent } from "./views/pages/admin/admin.component";
import { ProductManagementPageComponent } from './views/pages/product-management/product-management.component';

const appRoutes: Routes = [
  { path: "product/:product-id", component: ProductPageComponent },
  { path: "category/:category-id", component: HomePageComponent },
  { path: "cart", component: CartPageComponent },
  { path: "login", component: LoginPageComponent },
  {
    path: "admin",
    children: [
      { path: "admins", component: AdminPageComponent },
      { path: "products", component: ProductManagementPageComponent },
      { path: "**", redirectTo: "admins" }
    ]
  },
  { path: "", component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
