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
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { CookieService } from "ngx-cookie-service";
import { LoginPageComponent } from './views/pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPageComponent } from './views/pages/admin/admin.component';
import { MatTableModule } from '@angular/material/table';
import { ProductManagementPageComponent } from './views/pages/product-management/product-management.component';
import { YesNoPopupComponent } from './views/elements/yes-no-popup/yes-no-popup.component';
import { AdminSidebarComponent } from './views/elements/admin-sidebar/admin-sidebar.component';
import { CategoryManagementComponent } from './views/pages/category-management/category-management.component';
import { OrderManagementComponent } from './views/pages/order-management/order-management.component';
import { FormDialogComponent } from './views/elements/form-dialog/form-dialog.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SignUpPageComponent } from './views/pages/signup/signup.component';
import { EditProfilePageComponent } from './views/pages/edit-profile-page/edit-profile-page.component';
import { PurchasePageComponent } from './views/pages/purchase-page/purchase-page.component';
import { MatStepperModule } from "@angular/material/stepper";

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
    LoginPageComponent,
    AdminPageComponent,
    ProductManagementPageComponent,
    YesNoPopupComponent,
    AdminSidebarComponent,
    CategoryManagementComponent,
    OrderManagementComponent,
    FormDialogComponent,
    SignUpPageComponent,
    EditProfilePageComponent,
    PurchasePageComponent
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
    MatTableModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent],
  entryComponents: [OrderPopupComponent, YesNoPopupComponent, FormDialogComponent]
})
export class AppModule {}
