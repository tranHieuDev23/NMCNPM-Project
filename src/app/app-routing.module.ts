import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./views/pages/home/home.component";
import { ProductPageComponent } from "./views/pages/product/product.component";
import { CartPageComponent } from "./views/pages/cart/cart.component";
import { LoginPageComponent } from "./views/pages/login/login.component";
import { AdminPageComponent } from "./views/pages/admin/admin.component";
import { ProductManagementPageComponent } from "./views/pages/product-management/product-management.component";
import { RouteLoginGuardService } from "./controllers/route-login-guard.service";
import { RouteLogoutGuardService } from "./controllers/route-logout-guard.service";
import { CategoryManagementComponent } from "./views/pages/category-management/category-management.component";
import { OrderManagementComponent } from "./views/pages/order-management/order-management.component";
import { SignUpPageComponent } from "./views/pages/signup/signup.component";
import { RouteAdminGuardService } from "./controllers/route-admin-guard.service";
import { EditProfilePageComponent } from "./views/pages/edit-profile-page/edit-profile-page.component";
import { PurchasePageComponent } from "./views/pages/purchase-page/purchase-page.component";

const appRoutes: Routes = [
  { path: "product/:product-id", component: ProductPageComponent },
  { path: "category/:category-id", component: HomePageComponent },
  { path: "cart", component: CartPageComponent },
  {
    path: "login",
    canActivate: [RouteLogoutGuardService],
    component: LoginPageComponent
  },
  {
    path: "signup",
    canActivate: [RouteLogoutGuardService],
    component: SignUpPageComponent
  },
  {
    path: "admin",
    canActivate: [RouteAdminGuardService],
    children: [
      { path: "admins", component: AdminPageComponent },
      { path: "products", component: ProductManagementPageComponent },
      { path: "categories", component: CategoryManagementComponent },
      { path: "orders", component: OrderManagementComponent }
    ]
  },
  {
    path: "edit-profile",
    canActivate: [RouteLoginGuardService],
    component: EditProfilePageComponent
  },
  {
    path: "purchase",
    canActivate: [RouteLoginGuardService],
    component: PurchasePageComponent
  },
  { path: "**", component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
