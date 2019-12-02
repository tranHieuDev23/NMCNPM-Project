import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./views/pages/home/home.component";
import { ProductComponent } from "./views/pages/product/product.component";

const appRoutes: Routes = [
  { path: "product/:product-id", component: ProductComponent },
  { path: "", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
