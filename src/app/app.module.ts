import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./views/elements/header/header.component";
import { FooterComponent } from "./views/elements/footer/footer.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { HomePageComponent } from "./views/pages/home/home.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ProductPageComponent } from "./views/pages/product/product.component";
import { SafeHtmlPipe } from "./views/pipes/safe-html/safe-html.pipe";
import { SliderModule } from "angular-image-slider";
import { ShoppingCartModule } from "ng-shopping-cart";
import ProductCartItem from "./models/cart-item";
import { OrderPopupComponent } from "./views/elements/order-popup/order-popup.component";
import { MatDialogModule } from "@angular/material/dialog";
import { CartPageComponent } from "./views/pages/cart/cart.component";
import { MatBadgeModule } from "@angular/material/badge";
import { MatMenuModule } from "@angular/material/menu";
import { SidebarComponent } from "./views/elements/sidebar/sidebar.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ConfirmationPopupComponent } from "./views/elements/confirmation-popup/confirmation-popup.component";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { CookieService } from "ngx-cookie-service";
import { LoginPageComponent } from './views/pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { AdminPageComponent } from './views/pages/admin/admin.component';
import { MatTableModule } from '@angular/material/table';
import { ProductManagementPageComponent } from './views/pages/product-management/product-management.component';
import { AddUserPopupComponent } from './views/elements/add-user-popup/add-user-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    ProductPageComponent,
    SafeHtmlPipe,
    OrderPopupComponent,
    CartPageComponent,
    SidebarComponent,
    ConfirmationPopupComponent,
    LoginPageComponent,
    AdminPageComponent,
    ProductManagementPageComponent,
    AddUserPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    FlexLayoutModule,
    MatListModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    SliderModule,
    ShoppingCartModule.forRoot({
      itemType: ProductCartItem
    }),
    MatDialogModule,
    MatBadgeModule,
    MatMenuModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    MatTableModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent],
  entryComponents: [OrderPopupComponent, ConfirmationPopupComponent, AddUserPopupComponent]
})
export class AppModule {}
