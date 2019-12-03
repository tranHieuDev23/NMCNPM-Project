import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './views/elements/header/header.component';
import { FooterComponent } from './views/elements/footer/footer.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './views/pages/home/home.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductComponent } from './views/pages/product/product.component';
import { SafeHtmlPipe } from './views/pipes/safe-html/safe-html.pipe';
import { SliderModule } from 'angular-image-slider';
import { ShoppingCartModule } from 'ng-shopping-cart';
import ProductCartItem from './models/cart-item';
import { OrderPopupComponent } from './views/elements/order-popup/order-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductComponent,
    SafeHtmlPipe,
    OrderPopupComponent
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
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    OrderPopupComponent
  ]
})
export class AppModule { }
