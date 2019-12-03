import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./views/pages/home/home.component";
import { ProductPageComponent } from "./views/pages/product/product.component";
import { CartPageComponent } from "./views/pages/cart/cart.component";

const appRoutes: Routes = [
  { path: "product/:product-id", component: ProductPageComponent },
  { path: "cart", component: CartPageComponent },
  { path: "", component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
